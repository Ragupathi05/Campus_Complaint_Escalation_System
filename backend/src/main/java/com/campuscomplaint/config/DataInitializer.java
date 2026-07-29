package com.campuscomplaint.config;

import com.campuscomplaint.entity.Category;
import com.campuscomplaint.entity.Complaint;
import com.campuscomplaint.entity.Department;
import com.campuscomplaint.entity.LocationNode;
import com.campuscomplaint.entity.User;
import com.campuscomplaint.enums.LocationType;
import com.campuscomplaint.enums.PriorityLevel;
import com.campuscomplaint.enums.RoleType;
import com.campuscomplaint.repository.CategoryRepository;
import com.campuscomplaint.repository.ComplaintRepository;
import com.campuscomplaint.repository.DepartmentRepository;
import com.campuscomplaint.repository.LocationNodeRepository;
import com.campuscomplaint.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;
    private final CategoryRepository categoryRepository;
    private final LocationNodeRepository locationNodeRepository;
    private final UserRepository userRepository;
    private final ComplaintRepository complaintRepository;
    private final PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;

    public DataInitializer(DepartmentRepository departmentRepository,
                           CategoryRepository categoryRepository,
                           LocationNodeRepository locationNodeRepository,
                           UserRepository userRepository,
                           ComplaintRepository complaintRepository,
                           PasswordEncoder passwordEncoder) {
        this.departmentRepository = departmentRepository;
        this.categoryRepository = categoryRepository;
        this.locationNodeRepository = locationNodeRepository;
        this.userRepository = userRepository;
        this.complaintRepository = complaintRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        System.out.println(">>> Checking MITS Facility Maintenance Departments...");

        // Purge ALL legacy Academic Departments from the Facility Maintenance Departments table
        List<Department> allDepts = departmentRepository.findAll();
        for (Department dept : allDepts) {
            String nameLower = dept.getName() != null ? dept.getName().toLowerCase() : "";
            String descLower = dept.getDescription() != null ? dept.getDescription().toLowerCase() : "";
            boolean isAcademic = descLower.startsWith("academic dept") ||
                    nameLower.contains("computer science") ||
                    nameLower.contains("artificial intelligence") ||
                    nameLower.contains("electronics & communication") ||
                    nameLower.contains("electrical & electronics") ||
                    nameLower.contains("mechanical engineering") ||
                    nameLower.contains("civil engineering");

            if (isAcademic) {
                // Unlink users attached to this academic department entry before deletion
                userRepository.findAll().stream()
                        .filter(u -> u.getDepartment() != null && u.getDepartment().getId().equals(dept.getId()))
                        .forEach(u -> {
                            u.setDepartment(null);
                            userRepository.save(u);
                        });
                departmentRepository.delete(dept);
                System.out.println("   - Purged Academic Dept entry from Facility table: [" + dept.getCode() + "] " + dept.getName());
            }
        }

        // Ensure Facility Maintenance Departments exist (Only Facility & Maintenance Service Units)
        createDeptIfMissing("ELEC", "Electrical Maintenance", "Electrical equipment and power-related issues");
        createDeptIfMissing("CIVIL", "Civil & Infrastructure", "Building, walls, roofs, doors, windows, furniture");
        createDeptIfMissing("PLUMB", "Plumbing & Water Supply", "Water supply, drainage, pipelines, washrooms");
        createDeptIfMissing("ITNET", "IT & Network Services", "Internet, Wi-Fi, LAN, computer labs, projectors");
        createDeptIfMissing("HOUSE", "Housekeeping & Cleaning", "Campus cleanliness and hygiene");
        createDeptIfMissing("GARDEN", "Landscaping & Gardening", "Gardens, trees, lawns, irrigation");
        createDeptIfMissing("HOSTEL", "Hostel Maintenance", "Hostel rooms and hostel facilities");
        createDeptIfMissing("TRANSPORT", "Transport Services", "College buses and transport facilities");
        createDeptIfMissing("SECURITY", "Security & Safety", "Security personnel, CCTV, access control");
        createDeptIfMissing("GENERAL", "General Administration", "Miscellaneous issues not fitting other departments");

        String defaultPass = passwordEncoder.encode("password123");

        // Seed ONLY System Admin if missing
        createUserIfMissing("admin", "admin@mits.ac.in", defaultPass, "System Administrator", RoleType.ROLE_ADMIN, null);

        // Purge dummy demo users (depthead1, staff1, student1, admin1, principal1) if present
        List<String> dummyUsernames = Arrays.asList("depthead1", "staff1", "student1", "admin1", "principal1");
        for (String dummyUser : dummyUsernames) {
            userRepository.findByUsername(dummyUser).ifPresent(u -> {
                Long uid = u.getId();

                // 1. Unlink from departments where user is deptHead
                departmentRepository.findAll().stream()
                        .filter(d -> d.getDeptHead() != null && d.getDeptHead().getId().equals(uid))
                        .forEach(d -> {
                            d.setDeptHead(null);
                            departmentRepository.save(d);
                        });

                // 2. Unlink from complaint history audit logs
                entityManager.createQuery("UPDATE ComplaintHistory ch SET ch.updatedBy = null WHERE ch.updatedBy.id = :uid")
                        .setParameter("uid", uid)
                        .executeUpdate();

                // 3. Unlink from complaints (deptHead & assignedStaff)
                entityManager.createQuery("UPDATE Complaint c SET c.deptHead = null WHERE c.deptHead.id = :uid")
                        .setParameter("uid", uid)
                        .executeUpdate();

                entityManager.createQuery("UPDATE Complaint c SET c.assignedStaff = null WHERE c.assignedStaff.id = :uid")
                        .setParameter("uid", uid)
                        .executeUpdate();

                // 4. Delete test complaints created by this student user if any
                List<Complaint> studentComplaints = complaintRepository.findByStudentId(uid);
                if (!studentComplaints.isEmpty()) {
                    complaintRepository.deleteAll(studentComplaints);
                }

                // 5. Delete the user safely
                userRepository.delete(u);
                System.out.println("   - Safely purged dummy demo user: @" + dummyUser);
            });
        }

        Department electrical = departmentRepository.findByCode("ELEC").orElse(null);

        // Seed Sample Issue Categories for Facility Departments
        if (categoryRepository.count() == 0 && electrical != null) {
            Department civil = departmentRepository.findByCode("CIVIL").orElse(electrical);
            Department plumbing = departmentRepository.findByCode("PLUMB").orElse(electrical);
            Department itnet = departmentRepository.findByCode("ITNET").orElse(electrical);
            Department house = departmentRepository.findByCode("HOUSE").orElse(electrical);

            Category cat1 = Category.builder()
                    .name("Power Cut / Socket Failure")
                    .description("Power trips or wall socket damage")
                    .department(electrical)
                    .slaHours(4)
                    .defaultPriority(PriorityLevel.HIGH)
                    .build();

            Category cat2 = Category.builder()
                    .name("Furniture & Door Repair")
                    .description("Broken desk, door lock, or window pane")
                    .department(civil)
                    .slaHours(24)
                    .defaultPriority(PriorityLevel.MEDIUM)
                    .build();

            Category cat3 = Category.builder()
                    .name("Wi-Fi & LAN Network Drop")
                    .description("No internet in lab or block Wi-Fi down")
                    .department(itnet)
                    .slaHours(6)
                    .defaultPriority(PriorityLevel.HIGH)
                    .build();

            Category cat4 = Category.builder()
                    .name("Water Supply / Tap Leakage")
                    .description("Restroom tap leak or no water flow")
                    .department(plumbing)
                    .slaHours(8)
                    .defaultPriority(PriorityLevel.MEDIUM)
                    .build();

            Category cat5 = Category.builder()
                    .name("Sanitation & Waste Disposal")
                    .description("Classroom cleaning or dustbin clearance")
                    .department(house)
                    .slaHours(4)
                    .defaultPriority(PriorityLevel.LOW)
                    .build();

            categoryRepository.saveAll(Arrays.asList(cat1, cat2, cat3, cat4, cat5));
        }

        // Seed Comprehensive Campus Location Hierarchy if Boys Hostel is missing
        if (!locationNodeRepository.existsByName("Boys Hostel (Visvesvaraya Hall)")) {
            System.out.println(">>> Initializing Comprehensive MITS Campus Location Hierarchy...");

            LocationNode campus = getOrCreateLocation("MITS Main Campus (Madanapalle)", LocationType.CAMPUS, null);

            // 1. Block A (EB Block - Main Academic)
            LocationNode blockA = getOrCreateLocation("Block A (EB Block)", LocationType.BLOCK, campus);
            
            LocationNode blockA_gf = getOrCreateLocation("Ground Floor", LocationType.FLOOR, blockA);
            getOrCreateLocation("Principal Office & Admin Wing", LocationType.ROOM, blockA_gf);
            getOrCreateLocation("Central Library & Reading Hall", LocationType.ROOM, blockA_gf);
            getOrCreateLocation("Seminar Hall 1 (Auditorium)", LocationType.ROOM, blockA_gf);

            LocationNode blockA_1f = getOrCreateLocation("1st Floor", LocationType.FLOOR, blockA);
            getOrCreateLocation("CSE Department Staff Room", LocationType.ROOM, blockA_1f);
            getOrCreateLocation("Computer Lab 1 (AI & ML Lab)", LocationType.ROOM, blockA_1f);
            getOrCreateLocation("Lecture Hall 101", LocationType.ROOM, blockA_1f);

            LocationNode blockA_2f = getOrCreateLocation("2nd Floor", LocationType.FLOOR, blockA);
            getOrCreateLocation("Room 204 (CSE Lab 3)", LocationType.ROOM, blockA_2f);
            getOrCreateLocation("ECE Microprocessor Lab", LocationType.ROOM, blockA_2f);

            LocationNode blockA_3f = getOrCreateLocation("3rd Floor", LocationType.FLOOR, blockA);
            getOrCreateLocation("Project Presentation Hall 301", LocationType.ROOM, blockA_3f);
            getOrCreateLocation("Central Server Room & Data Center", LocationType.ROOM, blockA_3f);

            // 2. Block B (Science & Engineering Block)
            LocationNode blockB = getOrCreateLocation("Block B (Science & Mech)", LocationType.BLOCK, campus);

            LocationNode blockB_gf = getOrCreateLocation("Ground Floor", LocationType.FLOOR, blockB);
            getOrCreateLocation("Chemistry & Materials Lab", LocationType.ROOM, blockB_gf);
            getOrCreateLocation("Physics Laboratory", LocationType.ROOM, blockB_gf);

            LocationNode blockB_1f = getOrCreateLocation("1st Floor", LocationType.FLOOR, blockB);
            getOrCreateLocation("Mechanical Workshop & CAD Lab", LocationType.ROOM, blockB_1f);
            getOrCreateLocation("Electrical Machines Lab", LocationType.ROOM, blockB_1f);

            // 3. Block C (R&D Innovation Hub)
            LocationNode blockC = getOrCreateLocation("Block C (R&D Innovation Hub)", LocationType.BLOCK, campus);

            LocationNode blockC_gf = getOrCreateLocation("Ground Floor", LocationType.FLOOR, blockC);
            getOrCreateLocation("Incubation Center & Startup Hub", LocationType.ROOM, blockC_gf);

            LocationNode blockC_1f = getOrCreateLocation("1st Floor", LocationType.FLOOR, blockC);
            getOrCreateLocation("High-Performance Computing (HPC) Lab", LocationType.ROOM, blockC_1f);

            // 4. Boys Hostel (Visvesvaraya Hall)
            LocationNode boysHostel = getOrCreateLocation("Boys Hostel (Visvesvaraya Hall)", LocationType.BLOCK, campus);

            LocationNode bh_gf = getOrCreateLocation("Ground Floor", LocationType.FLOOR, boysHostel);
            getOrCreateLocation("Boys Dining Hall & Mess", LocationType.ROOM, bh_gf);
            getOrCreateLocation("Hostel Gymnasium & Recreation Room", LocationType.ROOM, bh_gf);

            LocationNode bh_1f = getOrCreateLocation("1st Floor", LocationType.FLOOR, boysHostel);
            getOrCreateLocation("Room 101 (Hostel)", LocationType.ROOM, bh_1f);
            getOrCreateLocation("Room 108 (Hostel)", LocationType.ROOM, bh_1f);

            LocationNode bh_2f = getOrCreateLocation("2nd Floor", LocationType.FLOOR, boysHostel);
            getOrCreateLocation("Room 205 (Hostel)", LocationType.ROOM, bh_2f);
            getOrCreateLocation("West Wing Washroom Complex", LocationType.ROOM, bh_2f);

            // 5. Girls Hostel (Kalpana Chawla Hall)
            LocationNode girlsHostel = getOrCreateLocation("Girls Hostel (Kalpana Chawla Hall)", LocationType.BLOCK, campus);

            LocationNode gh_gf = getOrCreateLocation("Ground Floor", LocationType.FLOOR, girlsHostel);
            getOrCreateLocation("Girls Dining Hall & Mess", LocationType.ROOM, gh_gf);

            LocationNode gh_1f = getOrCreateLocation("1st Floor", LocationType.FLOOR, girlsHostel);
            getOrCreateLocation("Room 112 (Hostel)", LocationType.ROOM, gh_1f);
            getOrCreateLocation("Room 115 (Hostel)", LocationType.ROOM, gh_1f);

            // 6. Amenities & Outdoor Grounds
            LocationNode amenities = getOrCreateLocation("Campus Amenities & Grounds", LocationType.BLOCK, campus);

            LocationNode ground_area = getOrCreateLocation("Ground Area", LocationType.FLOOR, amenities);
            getOrCreateLocation("Central Food Court & Canteen", LocationType.ROOM, ground_area);
            getOrCreateLocation("Main Athletics Ground & Sports Complex", LocationType.ROOM, ground_area);
            getOrCreateLocation("College Bus Depot & Parking Yard", LocationType.ROOM, ground_area);

            System.out.println("   + Seeding completed! Total location nodes: " + locationNodeRepository.count());
        }

        System.out.println(">>> MITS Facility Maintenance Data Initialization Finished!");
    }

    private LocationNode getOrCreateLocation(String name, LocationType type, LocationNode parent) {
        return locationNodeRepository.findByName(name)
                .orElseGet(() -> {
                    LocationNode node = LocationNode.builder()
                            .name(name)
                            .type(type)
                            .parent(parent)
                            .build();
                    return locationNodeRepository.save(node);
                });
    }

    private void createDeptIfMissing(String code, String name, String description) {
        if (departmentRepository.findByCode(code).isEmpty() && departmentRepository.findByName(name).isEmpty()) {
            Department dept = Department.builder()
                    .code(code)
                    .name(name)
                    .description(description)
                    .active(true)
                    .build();
            departmentRepository.save(dept);
            System.out.println("   + Added Department: [" + code + "] " + name);
        }
    }

    private User createUserIfMissing(String username, String email, String password, String fullName, RoleType role, Department dept) {
        if (!userRepository.existsByUsername(username)) {
            User user = User.builder()
                    .username(username)
                    .email(email)
                    .password(password)
                    .fullName(fullName)
                    .role(role)
                    .department(dept)
                    .active(true)
                    .build();
            return userRepository.save(user);
        }
        return userRepository.findByUsername(username).orElse(null);
    }
}
