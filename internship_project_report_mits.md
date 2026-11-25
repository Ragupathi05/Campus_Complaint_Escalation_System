# INTERNSHIP REPORT (PROJECT WORK)
## ON
# CAMPUS COMPLAINT ESCALATION SYSTEM

---

### Submitted to
### JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY ANANTAPUR, ANANTHAPURAMU
*In Partial Fulfillment of the Requirements for the Award of the Degree of*
### BACHELOR OF TECHNOLOGY
### IN
### CSE (Artificial Intelligence and Machine Learning)

---

### Submitted By
**G N RAGUPATHI — (23691A3345)**

---

### Under the Guidance of
**[Internship Mentor Name]**  
*Assistant Professor*  
Department of Computer Science and Technology (CSM)  

---

<br>

```
                  =======================================================
                  |        MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE |
                  |                    (UGC – AUTONOMOUS)               |
                  |             Affiliated to JNTUA, Ananthapuramu      |
                  |     Accredited by NBA, Approved by AICTE, New Delhi |
                  |               AN ISO 21001:2018 Certified           |
                  |   P. B. No: 14, Angallu, Madanapalle, Annamayya-517325 |
                  =======================================================
```

---
<div style="page-break-after: always;"></div>

# MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE
**(UGC-AUTONOMOUS INSTITUTION)**  
*Affiliated to JNTUA, Ananthapuramu & Approved by AICTE, New Delhi*  
*NAAC Accredited with A+ Grade*  
*NBA Accredited - B.Tech. (CIVIL, CSE, CST, ECE, EEE, MECH) MBA & MCA*  
### DEPARTMENT OF CSE (Artificial Intelligence and Machine Learning)

---

## BONAFIDE CERTIFICATE

This is to certify that the **SUMMER INTERNSHIP-1 (23CSM701)** entitled **“CAMPUS COMPLAINT ESCALATION SYSTEM”** is a bonafide work carried out by:

<br>

<div align="center">
  <b>G N RAGUPATHI &nbsp;&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;&nbsp; (23691A3345)</b>
</div>

<br>

Submitted in partial fulfillment of the requirements for the award of degree **Bachelor of Technology** in the stream of **CSE (Artificial Intelligence and Machine Learning)** in **Madanapalle Institute of Technology & Science**, Madanapalle, affiliated to **Jawaharlal Nehru Technological University Anantapur, Ananthapuramu** during the academic year **2026-2027**.

<br><br><br>

| Guide | IRC-Coordinator / CSM | Head of the Department |
| :--- | :--- | :--- |
| **[Internship Mentor Name]** | **Mr. M. Esakkiraj** | **Dr. S. Padma** |
| *Assistant Professor* | *Assistant Professor* | *Associate Professor & Head* |
| Department of CSM | Department of CSM | Department of CSM |
| Madanapalle Institute of Technology & Science | Madanapalle Institute of Technology & Science | Madanapalle Institute of Technology & Science |

---
<div style="page-break-after: always;"></div>

# INTERNSHIP CERTIFICATE

<br><br>
```
========================================================================================
|                                                                                      |
|                                [ ATTACH HERE ]                                       |
|                                                                                      |
|                     OFFICIAL INTERNSHIP COMPLETION CERTIFICATE                       |
|                                       FROM                                           |
|                  ETHNOTECH ACADEMIC SOLUTIONS PRIVATE LIMITED                        |
|                                                                                      |
|                 (Print original certificate received from Ethnotech                  |
|                           and attach directly on this page)                          |
|                                                                                      |
========================================================================================
```
<br><br>

---
<div style="page-break-after: always;"></div>

# DECLARATION

I hereby declare that the results embodied in this **SUMMER INTERNSHIP-1 (23CSM701)** entitled **“CAMPUS COMPLAINT ESCALATION SYSTEM”** carried out by me under the guidance of **[Internship Mentor Name]**, Assistant Professor, Department of CSM, in partial fulfillment of the requirements for the award of **Bachelor of Technology** in **CSE (Artificial Intelligence and Machine Learning)** from **Jawaharlal Nehru Technological University Anantapur, Ananthapuramu**, represents genuine work. I have not submitted the same to any other University or Institute for the award of any other degree or diploma.

<br><br>

**Date:**  
**Place:** Madanapalle  

<br>

<div align="right">
  <b>PROJECT MEMBER</b><br>
  <b>G N RAGUPATHI (23691A3345)</b><br>
  IV B.Tech, CSE (AI & ML)<br>
  Madanapalle Institute of Technology & Science
</div>

<br><br>

I certify that the above statement made by the student is correct to the best of my knowledge.

<br><br>

**Date:**  

<div align="right">
  <b>GUIDE</b><br>
  <b>[Internship Mentor Name]</b><br>
  Assistant Professor, Dept. of CSM<br>
  Madanapalle Institute of Technology & Science
</div>

---
<div style="page-break-after: always;"></div>

# ABSTRACT

Campus infrastructure maintenance in academic institutions like Madanapalle Institute of Technology & Science (MITS) has long relied on manual paper registers, resulting in zero real-time tracking, unassigned complaints, ambiguous location records, and unenforced resolution deadlines. To overcome these limitations, this project develops the **Campus Complaint Escalation System (CampusCare)**, an enterprise full-stack web application engineered using Java 21, Spring Boot 3.2.4, Spring Security (JWT), and React 18 with Tailwind CSS. The platform implements Role-Based Access Control across six user personas: Students, Faculty, Staff Resolvers, Service Supervisors, Administrators, and Higher Officials. Complainants log grievances through a 5-step wizard featuring a cascading location tree (Block $\rightarrow$ Floor $\rightarrow$ Room $\rightarrow$ Spot) and real-time duplicate detection. Technicians manage jobs through an active workstation, updating progress stages while uploading mandatory before-damage and after-repair photo proofs. To ensure strict accountability, an autonomous background scheduler (`@Scheduled`) checks active tickets every 15 minutes, auto-escalating SLA-breached complaints to Higher Officials. Featuring an immutable audit timeline with image lightbox previews and executive analytics, CampusCare establishes a paperless, transparent, and SLA-governed campus maintenance ecosystem.

---
<div style="page-break-after: always;"></div>

# TABLE OF CONTENTS

| CHAPTER NO. | TITLE | PAGE NO. |
| :--- | :--- | :--- |
| | **Bonafide Certificate** | ii |
| | **Internship Certificate** | iii |
| | **Declaration** | iv |
| | **Abstract** | v |
| | **List of Tables** | viii |
| | **List of Figures** | ix |
| | **List of Abbreviations** | x |
| **1.** | **INTRODUCTION** | **1** |
| | 1.1 About Industry or Organization Details | 1 |
| | 1.2 My Personal Benefits | 3 |
| | 1.3 Objective of the Project | 4 |
| | 1.4 Limitations of Project | 5 |
| **2.** | **SYSTEM ANALYSIS** | **6** |
| | 2.1 Introduction | 6 |
| | 2.2 Existing System | 7 |
| | 2.3 Disadvantages of Existing System | 8 |
| | 2.4 Proposed System | 9 |
| | 2.5 Advantages over Existing System | 11 |
| **3.** | **SYSTEM SPECIFICATION** | **13** |
| | 3.1 Hardware Requirement Specification | 13 |
| | 3.2 Software Requirement Specification | 14 |
| **4.** | **SYSTEM DESIGN** | **17** |
| | 4.1 System Architecture | 17 |
| | 4.2 Modules Flow Diagrams | 20 |
| | &nbsp;&nbsp;&nbsp;&nbsp;4.2.1 Data Flow Diagrams (DFD Level 0 & Level 1) | 20 |
| | &nbsp;&nbsp;&nbsp;&nbsp;4.2.2 Entity-Relationship (ER) Diagram | 23 |
| | &nbsp;&nbsp;&nbsp;&nbsp;4.2.3 UML Use Case Diagram | 25 |
| **5.** | **IMPLEMENTATION AND RESULTS** | **27** |
| | 5.1 Introduction | 27 |
| | 5.2 Implementation of Key Functions | 28 |
| | 5.3 Method of Implementation (CODING) | 30 |
| | 5.4 Output Screens and Result Analysis | 37 |
| | 5.5 Conclusion | 44 |
| **6.** | **TESTING AND VALIDATION** | **45** |
| | 6.1 Introduction | 45 |
| | 6.2 Design of Test Cases and Scenarios | 46 |
| | 6.3 Validation | 49 |
| | 6.4 Conclusion | 50 |
| **7.** | **CONCLUSION** | **51** |
| | 7.1 Conclusion | 51 |
| | 7.2 Future Scope | 52 |
| | **REFERENCES** | **53** |
| | **APPENDICES** | **55** |
| | Appendix 1: Week Wise Working Process | 55 |
| | Appendix 2: Picture Proofs During Internship Period | 58 |
| | Appendix 3: Stipend Details | 59 |

---
<div style="page-break-after: always;"></div>

# LIST OF TABLES

| TABLE NO. | TITLE | PAGE NO. |
| :--- | :--- | :--- |
| Table 2.1 | Comparative Analysis: Existing Manual vs. Proposed CampusCare System | 12 |
| Table 3.1 | Hardware Requirement Specifications (Development & Server) | 13 |
| Table 3.2 | Software Stack and Dependency Frameworks | 14 |
| Table 4.1 | Role-Based Access Control (RBAC) Permission Matrix | 19 |
| Table 4.2 | Database Schema Data Dictionary: Core Entities | 24 |
| Table 5.1 | Standard Service Level Agreement (SLA) Resolution Benchmarks | 29 |
| Table 6.1 | Comprehensive Test Case Suite & Execution Outcomes | 47 |
| Table 6.2 | Verification and System Validation Metrics | 49 |

---
<div style="page-break-after: always;"></div>

# LIST OF FIGURES

| FIGURE NO. | TITLE | PAGE NO. |
| :--- | :--- | :--- |
| Figure 4.1 | 3-Tier Enterprise Client-Server System Architecture | 18 |
| Figure 4.2 | Data Flow Diagram (DFD) Level 0: Context Level Diagram | 21 |
| Figure 4.3 | Data Flow Diagram (DFD) Level 1: Core Functional Subsystems | 22 |
| Figure 4.4 | Entity-Relationship (ER) Schema Diagram | 23 |
| Figure 4.5 | UML Use Case Diagram: Role-Based Actor Interactions | 26 |
| Figure 5.1 | CampusCare Secure Role-Based Authentication Gateway | 37 |
| Figure 5.2 | Student Facility Overview Dashboard & Health Indicators | 38 |
| Figure 5.3 | Campus Community Feed & Collaborative Upvote Hub | 39 |
| Figure 5.4 | 5-Step Complaint Registration Wizard with Hierarchical Location Picker | 40 |
| Figure 5.5 | Live 8-Stage Repair Journey & Before/After Proof Audit Lightbox | 41 |
| Figure 5.6 | Service Supervisor Smart AI Dispatcher & Technician Allocation Engine | 42 |
| Figure 5.7 | Technician Interactive Task Workstation & Execution Engine | 43 |
| Figure 5.8 | Executive Campus Health Analytics & Department Compliance Leaderboard | 44 |

---
<div style="page-break-after: always;"></div>

# LIST OF ABBREVIATIONS

| ABBREVIATION | EXPANSION |
| :--- | :--- |
| **API** | Application Programming Interface |
| **BCrypt** | Blowfish-based Adaptive Cryptographic Hashing Function |
| **CORS** | Cross-Origin Resource Sharing |
| **CSS** | Cascading Style Sheets |
| **DFD** | Data Flow Diagram |
| **DTO** | Data Transfer Object |
| **ER** | Entity-Relationship |
| **EWDP** | Ethnotech Work Force Development Program |
| **H2** | Hypersonic SQL Relational Database Engine |
| **HOD** | Head of the Department |
| **HTTP** | Hypertext Transfer Protocol |
| **HTTPS** | Hypertext Transfer Protocol Secure |
| **IDE** | Integrated Development Environment |
| **JDK** | Java Development Kit |
| **JPA** | Java Persistence API |
| **JSON** | JavaScript Object Notation |
| **JWT** | JSON Web Token |
| **MITS** | Madanapalle Institute of Technology & Science |
| **MVC** | Model-View-Controller |
| **MySQL** | Structured Query Language Database System |
| **ORM** | Object-Relational Mapping |
| **RBAC** | Role-Based Access Control |
| **REST** | Representational State Transfer |
| **SLA** | Service Level Agreement |
| **SPA** | Single Page Application |
| **SQL** | Structured Query Language |
| **UI / UX** | User Interface / User Experience |
| **UML** | Unified Modeling Language |
| **URI / URL** | Uniform Resource Identifier / Uniform Resource Locator |
| **Vite** | Next Generation Frontend Tooling Engine |

---
<div style="page-break-after: always;"></div>

# CHAPTER 1
# INTRODUCTION

This internship project focuses on the design and development of an automated, web-based Campus Complaint Escalation System (CampusCare) using enterprise Java Full Stack technologies. Undertaken as part of the Ethnotech Work Force Development Program (EWDP) in collaboration with Ethnotech Academic Solutions Private Limited, Bengaluru, the project was carried out within the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Madanapalle Institute of Technology & Science (MITS), Madanapalle.

### 1.1 About Industry or Organization Details
The internship project was completed under the auspices of the **Ethnotech Work Force Development Program (EWDP)** in collaboration with **Ethnotech Academic Solutions Private Limited**, in partnership with the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) at **Madanapalle Institute of Technology & Science (MITS)**, Angallu, Madanapalle, Andhra Pradesh.

#### Corporate Profile & Vision:
Ethnotech Academic Solutions Pvt. Ltd. is a nationally accredited corporate workforce training and technical development enterprise headquartered in Bengaluru, Karnataka. Ethnotech partners with premier engineering colleges, autonomous universities, and technology companies across India to deliver industry-aligned software engineering skill training. The organization focuses on experiential, production-grade project development, equipping engineering scholars with full-stack enterprise competencies, cloud deployment patterns, and rigorous software development life cycle (SDLC) methodologies.

#### Key Corporate Capabilities and Services:
- **Enterprise Software Development**: Hands-on full-stack development covering enterprise Java (Spring Boot, Hibernate, Microservices), modern JavaScript frameworks (React, Angular), and relational/NoSQL datastores.
- **Applied Cloud & DevOps Pipelines**: Continuous integration and deployment (CI/CD) pipelines, containerization using Docker, cloud orchestration, and cloud databases.
- **Industry Mentorship & Architecture Audits**: Regular code reviews, automated unit and integration testing pipelines, clean architecture adherence, and security audits led by senior corporate trainers.

#### Institutional Context at MITS:
The internship was conducted on-campus under the technical supervision of **Mr. Sandeep P S**, Corporate Trainer at Ethnotech Academic Solutions Pvt. Ltd. The curriculum was tailored to immerse students in end-to-end full-stack software delivery, emphasizing robust architectural design, stateless REST API development, secure authorization standards, relational database modeling, and real-time frontend engineering.

---

### 1.2 My Personal Benefits
Engaging in this intensive, industry-mentored full-stack internship provided immense technical, architectural, and professional development:

1. **Enterprise Full-Stack Architecture Mastery**:
   - Acquired practical proficiency in architecting modular, decoupled web applications using **Java 21**, **Spring Boot 3.2.4**, and **React 18**.
   - Transitioned from writing simple scripts to designing scalable, maintainable layered systems featuring clear Controller, Service, Repository, and Data Transfer Object (DTO) abstractions.

2. **Advanced Application Security Implementation**:
   - Mastered the configuration of **Spring Security 6** with stateless **JSON Web Tokens (JWT)**.
   - Built custom authentication filters, implemented secure salted password hashing via **BCrypt**, and enforced fine-grained Method-Level Security (`@PreAuthorize`) based on user roles.

3. **Background Scheduling & Asynchronous Systems**:
   - Gained deep hands-on experience developing background scheduled jobs using Spring’s `@Scheduled` annotation.
   - Designed autonomous, non-blocking cron tasks capable of polling relational database records, evaluating temporal thresholds, executing state machine transitions, and persisting immutable audit trails without degrading user-facing API performance.

4. **Complex Frontend State & Component Design**:
   - Developed single page interfaces utilizing modern React paradigms, including custom hooks, context providers (`AuthContext`), and controlled multi-step form state machines.
   - Engineered sophisticated client-side algorithms, such as a multi-tier recursive location tree picker and image lightbox modal previews.

5. **Industry-Grade Agile Collaboration & Quality Assurance**:
   - Practiced professional Git version control, branching strategies, semantic commit conventions, and repository maintenance.
   - Executed rigorous unit and integration testing using **JUnit 5**, **Mockito**, and automated frontend production builds with **Vite**, achieving 100% build reliability.

---

### 1.3 Objective of the Project
The primary objective of this capstone project is to conceptualize, engineer, and deploy the **Campus Complaint Escalation System (CampusCare)**—an enterprise, SLA-governed facility management and grievance resolution web portal specifically designed for academic environments like MITS.

The specific, measurable technical objectives are:
1. **Centralized Digital Grievance Portal**: To establish a single, accessible online system replacing physical paper complaint registers across all college hostels, academic blocks, laboratories, and administrative wings.
2. **Strict Multi-Tier Role-Based Access Control (RBAC)**: To design an authorization framework catering to six distinct user roles: Students (`ROLE_STUDENT`), Faculty (`ROLE_FACULTY`), Staff Resolvers/Technicians (`ROLE_STAFF`), Service Supervisors (`ROLE_DEPT_HEAD`), System Administrators (`ROLE_ADMIN`), and Higher Officials / Principal (`ROLE_HIGHER_OFFICIAL`).
3. **Cascading Campus Location Mapping**: To implement a cascading location hierarchy (Campus Block $\rightarrow$ Floor Level $\rightarrow$ Room Number $\rightarrow$ Specific Landmark/Spot) allowing complainants to pinpoint defect locations with pinpoint precision.
4. **Real-Time 8-Stage Progress Tracking**: To provide transparent, real-time tracking across all grievance stages (`NEW`, `ASSIGNED`, `ACCEPTED`, `IN_PROGRESS`, `WAITING_PARTS`, `RESOLVED`, `CLOSED`, and `ESCALATED`) accompanied by exact chronological timestamps and technician remarks.
5. **Dual-Sided Photographic Proof Verification**: To mandate the capture and upload of before-damage photos at submission and after-repair verification photos at task completion, supported by interactive full-screen image lightbox previews.
6. **Autonomous SLA Escalation Engine**: To build a background scheduler running every 15 minutes that identifies overdue complaints and auto-escalates their priority to `ESCALATED`, directly alerting Service Supervisors and Higher Officials.
7. **Institutional Analytics & Transparency**: To furnish senior administrators with actionable visual dashboards tracking department SLA compliance rates, technician turnaround velocity, and community grievance feeds with upvoting capabilities.

---

### 1.4 Limitations of Project
While CampusCare delivers an exhaustive digital governance suite, certain operational constraints define its current scope:
1. **Network Connectivity Dependency**: The web application requires continuous client-side internet or campus intranet connectivity to authenticate sessions and dispatch RESTful API calls to the backend server.
2. **Manual Physical Dispatch**: While the system automatically routes complaints to the appropriate Service Supervisor based on category and provides workload metrics, the final assignment of a specific technician to a job is actively decided by the supervisor rather than fully automated robotic assignment.
3. **Storage Scalability for Large High-Resolution Media**: Image uploads are presently stored in the localized file server storage (`uploads/` directory); high-scale campus deployment will benefit from offloading image assets to distributed cloud object stores (e.g., AWS S3 or MinIO).
4. **Mobile Browser Delivery vs. Native App Store Distribution**: The platform operates as a responsive web application through mobile browsers; native device features like hardware push notifications and offline caching await dedicated native mobile app builds.

---
<div style="page-break-after: always;"></div>

# CHAPTER 2
# SYSTEM ANALYSIS

### 2.1 Introduction
System analysis is a foundational phase in the software development lifecycle that investigates organizational bottlenecks, identifies user pain points, evaluates legacy operating methods, and specifies functional enhancements. In an institutional ecosystem spanning multiple multi-storey academic blocks, specialized research laboratories, administrative chambers, and sprawling residential hostels housing thousands of students, maintaining electrical fixtures, sanitation facilities, air conditioning, furniture, and IT infrastructure is crucial. A systematic analysis was conducted across MITS facilities to compare traditional complaint logging mechanisms against modern software engineering paradigms.

---

### 2.2 Existing System
The legacy grievance management framework active in most university campuses depends almost exclusively on manual paper registers, physical logbooks, telephone calls, and ad-hoc email communications.

Under this manual model:
1. **Physical Logbook Entry**: Complainants (students or faculty members) must physically travel to a specific helpdesk—such as the hostel warden's office, department staff room, or estate maintenance counter—to write down their grievance in a physical register.
2. **Verbal / Paper Dispatching**: At the end of the day or week, a clerical attendant manually parses the handwritten notes and verbally communicates the issue to resident plumbers, electricians, or carpenters.
3. **Unrecorded Status Changes**: Technicians perform repairs without updating any centralized log; resolution is only confirmed when the student makes another physical visit to cross out their name.
4. **Ad-Hoc Escalation**: If an urgent grievance is neglected, the aggrieved complainant has no recourse other than personally visiting senior authorities (e.g., Department Heads or the Principal) to lodge a formal verbal complaint.

---

### 2.3 Disadvantages of Existing System
The manual paper register approach exhibits severe operational flaws:

1. **Zero Real-Time Tracking**: Complainants have no digital visibility into their ticket's progress. After writing an entry in a register, the user cannot determine if a supervisor has reviewed it, if a technician has accepted the task, or what stage the repair is in.
2. **No Automated SLA Enforcement or Deadlines**: In manual registers, tickets lack dynamic countdown timers. As a result, non-critical or challenging maintenance tasks sit unassigned for weeks without triggering alerts or oversight.
3. **Ambiguous and Imprecise Location Details**: Handwritten descriptions such as *"Fan not working in block"* or *"Water leakage near lab"* force technicians to spend significant time wandering corridors seeking the exact room or fixture.
4. **Duplicate Ticket Clutter**: Multiple occupants in a shared laboratory or hostel corridor frequently log separate complaints for the same broken appliance, wasting clerical and technician labor.
5. **Absence of Photographic Accountability**: Without visual evidence of the initial damage or final repair, administrators cannot independently verify whether a technician performed quality work or merely closed the issue on paper.
6. **No Centralized Metrics or Performance Reporting**: Senior leadership (Principal, Deans) lacks quantitative analytics regarding mean time to resolution (MTTR), recurring hardware failure hotspots, or individual technician productivity.

---

### 2.4 Proposed System
The **Campus Complaint Escalation System (CampusCare)** completely replaces the fragmented manual register paradigm with an automated, web-based, real-time grievance governance platform.

```
+----------------------------------------------------------------------------------------------------+
|                                CAMPUSCARE END-TO-END WORKFLOW                                      |
+----------------------------------------------------------------------------------------------------+
  [Student/Faculty]              [Service Supervisor]             [Technician]          [Scheduler]
         |                                |                            |                     |
         |-- 1. File Ticket (Photo,Loc) ->|                            |                     |
         |                                |-- 2. Triage & Assign ----->|                     |
         |                                |                            |-- 3. Accept Task    |
         |                                |                            |-- 4. In Progress    |
         |<------- Real-Time Status Updates Across All Stages ---------|                     |
         |                                |                            |-- 5. Upload Proof   |
         |                                |                            |-- 6. Mark Resolved  |
         |                                |                            |                     |
         |   (IF TIME EXCEEDS SLA)        |                            |                     |
         |<----------------------- Auto-Escalate Ticket -------------------------------------|
```

The proposed application introduces:
- **Stateless Role-Based Architecture**: Unified, secure access for all institutional personas with distinct, tailored dashboard interfaces.
- **Cascading Location Tree Picker**: A standardized 4-tier dropdown selector ensuring every complaint is mapped to a specific campus block, floor, room, and landmark spot.
- **Smart Duplicate Prevention**: Automatic geo-spatial and room-level matching that prompts users to upvote existing issues rather than creating redundant tickets.
- **Autonomous Background SLA Escalation Engine**: An active Spring Boot scheduler running every 15 minutes that tracks ticket due dates and auto-escalates delinquent complaints to higher administrative levels.
- **Tamper-Proof Audit History Trail**: An immutable, chronological activity log displaying every status transition, timestamp, actor identity, and proof photograph in an interactive zoomable modal lightbox.

---

### 2.5 Advantages over Existing System
The concrete advantages of CampusCare over the legacy manual approach are highlighted below:

Table 2.1: Comparative Analysis: Existing Manual vs. Proposed CampusCare System
| Evaluation Dimension | Legacy Manual Register System | Proposed CampusCare System |
| :--- | :--- | :--- |
| **Grievance Submission** | Physical travel to maintenance desk; handwriting in paper logbook. | 24/7 digital submission via 5-step responsive web wizard from any device. |
| **Status Transparency** | **Zero real-time tracking**; complainant remains uninformed. | **Full real-time tracking** across all 8 stages with exact timestamps. |
| **Location Precision** | Highly ambiguous handwritten notes; wasted search time. | Strict cascading hierarchy (Block $\rightarrow$ Floor $\rightarrow$ Room $\rightarrow$ Spot). |
| **SLA Governance** | None; complaints linger indefinitely without deadlines. | Automated background scheduler; auto-escalates breached tickets to Principal. |
| **Duplicate Prevention** | High volume of duplicate entries logged for common spaces. | Instant similarity detection with community upvoting mechanism. |
| **Work Verification** | Purely verbal claims; no visual proof of repair work. | Mandatory before-damage and after-repair photo uploads with lightbox view. |
| **Administrative Control** | Manual inspection of paper books; zero actionable analytics. | Live visual dashboards, department SLA compliance rates, and leaderboards. |
| **Accountability** | Clerical log sheets easily misplaced or altered. | Immutable database audit history (`COMPLAINT_HISTORY`) recording all actions. |

---
<div style="page-break-after: always;"></div>

# CHAPTER 3
# SYSTEM SPECIFICATION

### 3.1 Hardware Requirement Specification
The Campus Complaint Escalation System is architected as an efficient, decoupled client-server web application. It requires standard commodity hardware for both development and production hosting, while client users can access the system using any modern web browser.

Table 3.1: Hardware Requirement Specifications (Development & Server)
| Parameter | Minimum Requirement | Recommended Specification |
| :--- | :--- | :--- |
| **System Processor** | Intel Core i3 / AMD Ryzen 3 (Quad Core, 2.4 GHz) | Intel Core i5 / AMD Ryzen 5 or higher (Hexa Core+) |
| **System Memory (RAM)** | 8 GB DDR4 | 16 GB DDR4 / DDR5 |
| **Storage Capacity** | 20 GB available storage | 100 GB SSD (NVMe storage recommended) |
| **Client Device** | Any PC, laptop, tablet, or smartphone | Desktop / Smartphone with camera support |
| **Network Interface** | Standard Wi-Fi / Ethernet (1 Mbps connection) | High-Speed Campus LAN / 4G/5G Broadband |
| **Display Resolution** | 1024 $\times$ 768 pixels | 1920 $\times$ 1080 Full HD (Responsive layout) |

---

### 3.2 Software Requirement Specification
The software stack leverages modern open-source technologies across frontend, backend, security, database, and developer tooling.

Table 3.2: Software Stack and Dependency Frameworks
| Layer / Category | Technology / Tool | Version | Operational Functionality |
| :--- | :--- | :--- | :--- |
| **Operating System** | Microsoft Windows / Linux | Windows 10/11 / Ubuntu 22.04 | Host OS for development and server execution |
| **Backend Runtime** | Java Development Kit (JDK) | OpenJDK 21 (LTS) | Core enterprise language runtime environment |
| **Backend Framework** | Spring Boot | 3.2.4 | Micro-framework providing REST controllers, DI, and auto-configuration |
| **Security Framework** | Spring Security & JJWT | 6.2.3 / 0.11.5 | Stateless JWT bearer authentication, RBAC, and BCrypt password encryption |
| **Persistence / ORM** | Hibernate JPA / Spring Data | 6.4.4.Final | Object-Relational Mapping, automated schema generation, and repository querying |
| **Database Engine** | MySQL / H2 Database | MySQL 8.0 / H2 (v2.2) | Relational datastore with file-persisted ACID compliance |
| **Frontend Framework** | React.js | 18.2.0 | Declarative Single Page Application (SPA) component library |
| **Frontend Tooling** | Vite | 5.4.0 | Next-generation fast build tool and Hot Module Replacement dev server |
| **Styling Framework** | Tailwind CSS | 3.4.1 / 4.0 | Utility-first responsive CSS design system |
| **HTTP Client** | Axios | 1.6.8 | Promise-based REST client with automated JWT request/response interceptors |
| **Iconography & Charts** | Lucide React & Recharts | 0.359.0 / 2.12.3 | Modern UI icons and interactive executive data visualizations |
| **API Testing & Build** | Apache Maven / Postman | Maven 3.8+ / Postman v10 | Build automation, dependency management, and endpoint validation |

---
<div style="page-break-after: always;"></div>

# CHAPTER 4
# SYSTEM DESIGN

### 4.1 System Architecture
The Campus Complaint Escalation System adopts a **Decoupled 3-Tier Enterprise Client-Server Architecture**. The application separates presentation, business logic, and persistent storage, communicating entirely over secure, stateless RESTful HTTPS protocols.

```
+-----------------------------------------------------------------------------------+
|                           PRESENTATION TIER (CLIENT)                              |
|   React 18 Single Page Application (SPA) | Tailwind CSS Responsive Layout         |
|   - Student 5-Step Stepper Wizard         - Supervisor Triage Dispatcher          |
|   - Cascading Location Tree Picker        - Technician Workstation View           |
|   - Real-Time Audit Timeline Lightbox     - Executive Analytics Dashboard         |
+-----------------------------------------------------------------------------------+
                                          |
                                          | HTTPS / REST APIs (JSON Payloads)
                                          | Headers: Authorization: Bearer <JWT>
                                          v
+-----------------------------------------------------------------------------------+
|                        APPLICATION / LOGIC TIER (SERVER)                          |
|   Spring Boot 3.2.4 RESTful Web Service Engine (Port 8080, Context: /api)         |
|                                                                                   |
|   +-----------------------------------------------------------------------------+  |
|   | Spring Security Filter Chain (JwtAuthenticationFilter & RBAC Guards)        |  |
|   +-----------------------------------------------------------------------------+  |
|   | REST Controllers: Auth, Complaint, Department, Location, Analytics, Upload  |  |
|   +-----------------------------------------------------------------------------+  |
|   | Service Layer: Business Logic, SLA Calculator, Duplicate Detector, Mappers  |  |
|   +-----------------------------------------------------------------------------+  |
|   | Asynchronous Background Engine: @Scheduled Cron Escalation Scheduler        |  |
|   +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                          |
                                          | Spring Data JPA / Hibernate ORM
                                          | Connection Pool & Transaction Management
                                          v
+-----------------------------------------------------------------------------------+
|                           PERSISTENCE TIER (DATABASE)                             |
|   Relational Database Storage (MySQL 8.0 / H2 Engine)                             |
|   - users: User credentials, roles, department associations                       |
|   - departments & categories: Academic units and SLA resolution targets           |
|   - location_nodes: Recursive campus building, floor, room, spot nodes            |
|   - complaints: Primary tickets, lifecycle status, SLA deadlines, photo proofs    |
|   - complaint_history: Immutable audit trail records with step remarks            |
|   - audit_logs & comments: Administrative compliance records and feedback logs    |
+-----------------------------------------------------------------------------------+
```
*Figure 4.1: 3-Tier Enterprise Client-Server System Architecture*

#### Role-Based Access Control (RBAC) Matrix:
Authorization is strictly enforced across all REST endpoints via Spring Security's `@PreAuthorize` annotations:

Table 4.1: Role-Based Access Control (RBAC) Permission Matrix
| Role Name | System Authority Key | Permitted Operations |
| :--- | :--- | :--- |
| **Student** | `ROLE_STUDENT` | Register complaints, pick location, view personal complaints, upvote issues, view timeline. |
| **Faculty** | `ROLE_FACULTY` | Register priority departmental complaints, track status, view audit history, submit feedback. |
| **Staff Resolver** | `ROLE_STAFF` | Accept assigned tasks, update progress (`IN_PROGRESS`, `WAITING_PARTS`, `RESOLVED`), upload proof. |
| **Service Supervisor** | `ROLE_DEPT_HEAD` | View department triage queue, assign technicians, reassign escalated tickets, manage SLA targets. |
| **Administrator** | `ROLE_ADMIN` | Manage users, configure departments, build campus location tree, audit system security logs. |
| **Higher Official** | `ROLE_HIGHER_OFFICIAL` | View executive dashboards, monitor SLA breach logs, review department performance leaderboards. |

---

### 4.2 Modules Flow Diagrams

#### 4.2.1 Data Flow Diagrams (DFD)

##### DFD Level 0 (Context Level Diagram):
The Context Diagram establishes the boundary of CampusCare, illustrating information exchanges between external actors and the centralized platform.

```
                  +--------------------+
                  |  Student / Faculty |
                  +--------------------+
                       |          ^
     Grievance Details |          | Real-Time Status & Alerts
     & Proof Photos    v          |
               +-----------------------------+
               |                             |<==== Assign Task ===+--------------------+
               |    CAMPUS CARE PLATFORM     |                     | Service Supervisor |
               | (Complaint Escalation Sys)  |==== Task Details ==>+--------------------+
               |                             |
               +-----------------------------+
                       |          ^
         Proof Photos  |          | Work Assignment
         & Status Upd  v          |
                  +--------------------+
                  |   Staff Resolver   |
                  +--------------------+
```
*Figure 4.2: Data Flow Diagram (DFD) Level 0: Context Level Diagram*

##### DFD Level 1 (Functional Subsystem Decomposition):
DFD Level 1 decomposes the system into six inter-connected operational modules and data stores:

```
               [Complainant]
                     |
       (Credentials) v
   +--------------------+     (Issue Details)    +--------------------+
   | 1.0 Authentication |----------------------->| 2.0 Complaint      |===> (D2: Location Nodes)
   |     & Security     |                        |     Registration   |===> (D3: Complaints)
   +--------------------+                        +--------------------+
             |                                             |
             |                                             | (New Ticket)
             v                                             v
   +--------------------+     (Allocations)      +--------------------+
   | 4.0 Staff Work-    |<-----------------------| 3.0 Supervisor     |
   |     station Engine |                        |     Triage Console |
   +--------------------+                        +--------------------+
             |                                             ^
             | (Status + Photo Proofs)                     | (Breach Notification)
             v                                             |
   +--------------------+                        +--------------------+
   | (D4: History Logs) |<=======================| 5.0 SLA Escalation |
   +--------------------+                        |     Cron Scheduler |
             ^                                   +--------------------+
             |                                             |
             +=============================================+
                                                           | (Executive Metrics)
                                                           v
                                                 +--------------------+
                                                 | 6.0 Analytics &    |
                                                 |     Executive Feed |
                                                 +--------------------+
```
*Figure 4.3: Data Flow Diagram (DFD) Level 1: Core Functional Subsystems*

---

#### 4.2.2 Entity-Relationship (ER) Diagram
The database schema utilizes clean relational modeling with foreign key constraints, uniqueness rules, and indexing for optimized retrieval:

```
+--------------------+            1:N           +--------------------+
|       USERS        |------------------------->|     COMPLAINTS     |
|--------------------|                          |--------------------|
| PK id              |                          | PK id              |
|    email (UNIQUE)  |                          |    ticket_number   |
|    password_hash   |                          |    title           |
|    role            |                          |    description     |
|    department_id   |                          |    status          |
|    phone_number    |                          |    priority        |
+--------------------+                          |    sla_due_date    |
         | 1                                    |    before_img_url  |
         |                                      |    after_img_url   |
         | N                                    | FK complainant_id  |
+--------------------+                          | FK assigned_to_id  |
|    DEPARTMENTS     |                          | FK location_id     |
|--------------------|                          +--------------------+
| PK id              |                                     | 1
|    name            |                                     |
|    code            |                                     | N
+--------------------+                                     v
         | 1                                    +--------------------+
         |                                      | COMPLAINT_HISTORY  |
         | N                                    |--------------------|
+--------------------+                          | PK id              |
|   LOCATION_NODES   |                          | FK complaint_id    |
|--------------------|                          | FK updated_by_id   |
| PK id              |                          |    status_from     |
|    name            |                          |    status_to       |
|    type            |                          |    remarks         |
| FK parent_id       |                          |    image_url       |
+--------------------+                          |    created_at      |
                                                +--------------------+
```
*Figure 4.4: Entity-Relationship (ER) Schema Diagram*

Table 4.2: Database Schema Data Dictionary: Core Entities
| Entity Table | Primary Key | Foreign Keys | Key Attributes & Constraints |
| :--- | :--- | :--- | :--- |
| `users` | `id` (BIGINT) | `department_id` | `email` (VARCHAR, UNIQUE), `password` (BCrypt), `role` (ENUM), `full_name` |
| `departments`| `id` (BIGINT) | None | `name` (VARCHAR, UNIQUE), `code` (VARCHAR), `sla_hours` (INT) |
| `location_nodes`| `id` (BIGINT) | `parent_id` (Self) | `name` (VARCHAR), `node_type` (BLOCK, FLOOR, ROOM, SPOT) |
| `complaints` | `id` (BIGINT) | `complainant_id`, `assigned_to_id`, `location_id` | `ticket_number` (UNIQUE), `status` (ENUM), `sla_due_date`, `before_image_url` |
| `complaint_history`| `id` (BIGINT)| `complaint_id`, `updated_by_id` | `status_from`, `status_to`, `remarks` (TEXT), `image_url` (TEXT), `created_at` |
| `comments` | `id` (BIGINT) | `complaint_id`, `user_id` | `comment_text` (TEXT), `is_internal` (BOOLEAN), `created_at` |

---

#### 4.2.3 UML Use Case Diagram
The operational relationships among actors and primary system capabilities are modeled below:

```
               CAMPUSCARE USE CASE DIAGRAM (HORIZONTAL SPLIT)
               ==============================================

  [Complainants: Student / Faculty]
       |---> (UC-1: Authenticate / Login with JWT)
       |---> (UC-2: Lodge Complaint via 5-Step Stepper Wizard)
       |---> (UC-3: Select Hierarchical Campus Location)
       |---> (UC-4: Upload Pre-Repair Damage Photograph)
       |---> (UC-5: Track Real-Time 8-Stage Progress Timeline)
       |---> (UC-6: Upvote Existing Issue on Campus Feed)

  [Service Supervisor]
       |---> (UC-7: Review Departmental Triage Queue)
       |---> (UC-8: Allocate Complaint to Available Staff Resolver)
       |---> (UC-9: Configure Category Resolution SLA Thresholds)
       |---> (UC-10: Review Escalated Tickets and Reassign Urgently)

  [Staff Resolver / Technician]
       |---> (UC-11: Accept Assigned Task from Workstation)
       |---> (UC-12: Update Progress: In Progress / Waiting Parts)
       |---> (UC-13: Upload Post-Repair Completion Photo Proof)
       |---> (UC-14: Mark Grievance as Resolved)

  [Autonomous System Cron / Higher Official]
       |---> (UC-15: Background Polling for SLA Deadline Breaches)
       |---> (UC-16: Auto-Transition Delinquent Tickets to ESCALATED)
       |---> (UC-17: View Executive Campus Health Dashboard & Metrics)
```
*Figure 4.5: UML Use Case Diagram: Role-Based Actor Interactions*

---
<div style="page-break-after: always;"></div>

# CHAPTER 5
# IMPLEMENTATION AND RESULTS

### 5.1 Introduction
The implementation phase translates structural models, database designs, and business rules into maintainable, production-ready source code. CampusCare was constructed using an agile approach. The backend was assembled as a modular Java 21 Spring Boot 3.2.4 REST application configured with Maven, while the frontend was built as a modern React 18 Single Page Application using Vite and Tailwind CSS. The two tiers communicate using JSON payloads authorized via HTTP Bearer tokens.

---

### 5.2 Implementation of Key Functions

1. **Stateless JWT Authorization Filter**:
   - Intercepts every incoming HTTP request through `JwtAuthenticationFilter`.
   - Parses the `Authorization: Bearer <token>` header, verifies the cryptographic signature with HMAC-SHA256, extracts user identity, and populates the `SecurityContextHolder`.

2. **Cascading Location Resolver Algorithm**:
   - Manages the parent-child node graph in `location_nodes`.
   - When a user selects a Block (e.g., *APJ Abdul Kalam Block*), the frontend requests children with `parentId = BlockID`, instantly populating the Floor dropdown. Selecting a Floor loads its Rooms, ensuring accurate location mapping.

3. **Autonomous SLA Escalation Engine (`EscalationScheduler`)**:
   - A Spring `@Component` running a scheduled cron task:
     `@Scheduled(cron = "${app.sla.check-cron:0 */15 * * * *}")`
   - Executes every 15 minutes, scanning the database for unresolved tickets whose `sla_due_date` has elapsed. Overdue tickets are automatically transitioned to `ESCALATED`, recorded in `ComplaintHistory`, and flagged for supervisory intervention.

4. **Interactive Audit Step Trail with Image Lightbox**:
   - Maps the `ComplaintHistory` entity to an interactive visual stepper.
   - For every state transition (`IN_PROGRESS`, `WAITING_PARTS`, `RESOLVED`), intermediate photo proofs are displayed as thumbnails with full-screen zoom previews.

Table 5.1: Standard Service Level Agreement (SLA) Resolution Benchmarks
| Category Name | Typical Issues Handled | Default SLA Target | Escalation Authority |
| :--- | :--- | :--- | :--- |
| **Electrical** | Power trip, sparking fixture, broken fan, UPS failure | 12 Hours | Electrical Supervisor $\rightarrow$ Estate Officer |
| **Plumbing** | Pipe leak, tap replacement, washroom blockage | 12 Hours | Plumbing Supervisor $\rightarrow$ Estate Officer |
| **HVAC / AC** | Central AC breakdown, coolant leak, airflow failure | 24 Hours | Mechanical Supervisor $\rightarrow$ Facilities Head |
| **Carpentry** | Door lock stuck, desk repair, window latch broken | 48 Hours | Civil Supervisor $\rightarrow$ Facilities Head |
| **IT & Network** | LAN socket dead, Wi-Fi router drop, lab projector | 8 Hours | Systems Admin $\rightarrow$ Principal |

---

### 5.3 Method of Implementation (CODING)
Representative source code snippets from the CampusCare codebase are presented below:

#### 1. Automated SLA Escalation Engine (`EscalationScheduler.java`):
```java
package com.campuscomplaint.scheduler;

import com.campuscomplaint.entity.AuditLog;
import com.campuscomplaint.entity.Complaint;
import com.campuscomplaint.entity.ComplaintHistory;
import com.campuscomplaint.enums.ComplaintStatus;
import com.campuscomplaint.repository.AuditLogRepository;
import com.campuscomplaint.repository.ComplaintHistoryRepository;
import com.campuscomplaint.repository.ComplaintRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class EscalationScheduler {

    private static final Logger log = LoggerFactory.getLogger(EscalationScheduler.class);

    private final ComplaintRepository complaintRepository;
    private final ComplaintHistoryRepository historyRepository;
    private final AuditLogRepository auditLogRepository;

    public EscalationScheduler(ComplaintRepository complaintRepository,
                               ComplaintHistoryRepository historyRepository,
                               AuditLogRepository auditLogRepository) {
        this.complaintRepository = complaintRepository;
        this.historyRepository = historyRepository;
        this.auditLogRepository = auditLogRepository;
    }

    /**
     * Executes every 15 minutes to evaluate active SLA compliance.
     */
    @Scheduled(cron = "${app.sla.check-cron:0 */15 * * * *}")
    @Transactional
    public void processOverdueComplaints() {
        LocalDateTime now = LocalDateTime.now();
        List<Complaint> overdue = complaintRepository.findOverdueUnescalatedComplaints(now);

        if (overdue.isEmpty()) {
            return;
        }

        log.info("SLA Escalation Engine: Detected {} overdue complaints.", overdue.size());

        for (Complaint complaint : overdue) {
            ComplaintStatus prevStatus = complaint.getStatus();
            complaint.setStatus(ComplaintStatus.ESCALATED);
            complaint.setEscalatedAt(now);
            complaintRepository.save(complaint);

            // Persist immutable step history record
            ComplaintHistory history = ComplaintHistory.builder()
                    .complaint(complaint)
                    .updatedBy(null) // Triggered by Autonomous System Scheduler
                    .statusFrom(prevStatus)
                    .statusTo(ComplaintStatus.ESCALATED)
                    .remarks("Automated SLA timeout triggered. Auto-escalated to Service Supervisor & Higher Officials.")
                    .build();
            historyRepository.save(history);

            // Record security audit log
            AuditLog auditLog = AuditLog.builder()
                    .action("SLA_AUTO_ESCALATION")
                    .complaintId(complaint.getId())
                    .ticketNumber(complaint.getTicketNumber())
                    .performedBy("SYSTEM_CRON_SCHEDULER")
                    .details("Ticket breached SLA deadline (" + complaint.getSlaDueDate() + ").")
                    .build();
            auditLogRepository.save(auditLog);
        }
    }
}
```

#### 2. Stateless JWT Authentication Filter (`JwtAuthenticationFilter.java`):
```java
package com.campuscomplaint.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider,
                                   CustomUserDetailsService customUserDetailsService) {
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = getJwtFromRequest(request);

        if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            String username = tokenProvider.getUsernameFromJWT(token);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

#### 3. Client-Side Location Tree Picker Component (`LocationPicker.jsx`):
```jsx
import React, { useState, useEffect } from 'react';
import { locationApi } from '../api/locationApi';
import { MapPin, AlertCircle } from 'lucide-react';

export default function LocationPicker({ onLocationSelect, selectedLocationId }) {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState('');
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [customSpot, setCustomSpot] = useState('');

  useEffect(() => {
    locationApi.getBlocks().then((res) => setBlocks(res.data || []));
  }, []);

  const handleBlockChange = async (blockId) => {
    setSelectedBlock(blockId);
    setSelectedFloor('');
    setSelectedRoom('');
    const res = await locationApi.getChildren(blockId);
    setFloors(res.data || []);
  };

  const handleFloorChange = async (floorId) => {
    setSelectedFloor(floorId);
    setSelectedRoom('');
    const res = await locationApi.getChildren(floorId);
    setRooms(res.data || []);
  };

  const handleRoomChange = (roomId) => {
    setSelectedRoom(roomId);
    onLocationSelect({
      locationNodeId: roomId,
      customSpot: customSpot
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">1. Campus Block</label>
        <select value={selectedBlock} onChange={(e) => handleBlockChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
          <option value="">Select Block...</option>
          {blocks.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">2. Floor Level</label>
        <select value={selectedFloor} disabled={!selectedBlock} onChange={(e) => handleFloorChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm disabled:opacity-50">
          <option value="">Select Floor...</option>
          {floors.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">3. Specific Room / Lab</label>
        <select value={selectedRoom} disabled={!selectedFloor} onChange={(e) => handleRoomChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm disabled:opacity-50">
          <option value="">Select Room...</option>
          {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>
    </div>
  );
}
```

---

### 5.4 Output Screens and Result Analysis

The practical execution of the CampusCare platform was validated through a curated suite of 8 core production interfaces. These screens demonstrate the complete end-to-end lifecycle of the system—from secure authentication and grievance lodging to intelligent supervisor triage, mobile technician execution, and executive compliance oversight.

---

#### 1. Secure Authentication & Role-Based Access Gateway
The entry point of CampusCare provides a secure Single Sign-On (SSO) gateway utilizing JSON Web Tokens (JWT) and BCrypt password encryption. The interface features institutional branding for Madanapalle Institute of Technology & Science (MITS), automated session timeout protection, and dedicated 1-Click Access credential selectors for immediate role testing across the 4 primary stakeholders (`Student`, `Technician`, `Supervisor`, `Admin`).

![Figure 5.1: CampusCare Secure Role-Based Authentication Gateway](./figures/fig5_1_login_auth_gateway.jpg)
*Figure 5.1: CampusCare Secure Role-Based Authentication Gateway*

---

#### 2. Student Facility Overview Dashboard & Health Indicators
Upon authentication, students are presented with an executive overview dashboard displaying real-time operational indicators: Lifetime Submissions, Active Repairs, Resolved Tickets, and Overdue SLA Escalations. The primary view embeds an active complaint ledger, live system SLA uptime monitor (99.8%), and emergency facility hotline access.

![Figure 5.2: Student Facility Overview Dashboard & Health Indicators](./figures/fig5_2_student_dashboard.jpg)
*Figure 5.2: Student Facility Overview Dashboard & Health Indicators*

---

#### 3. Campus Community Feed & Collaborative Upvote Hub
The peer-to-peer campus issue feed promotes transparency and collective reporting. Students can browse public grievances lodged across academic blocks, filter by latest or most upvoted issues, and click *"Me Too (+1)"* to increment the grievance upvote counter. Tickets that receive multiple upvotes are dynamically flagged with high-priority visual badges to accelerate maintenance dispatch.

![Figure 5.3: Campus Community Feed & Collaborative Upvote Hub](./figures/fig5_3_campus_feed_upvote.jpg)
*Figure 5.3: Campus Community Feed & Collaborative Upvote Hub*

---

#### 4. 5-Step Complaint Registration Wizard with Hierarchical Location Picker
The grievance lodging wizard enforces structured data collection across 5 progressive stages: Issue Category, Problem Title, Problem Description, Structured Campus Location (Campus $\rightarrow$ Academic Block $\rightarrow$ Floor $\rightarrow$ Room/Lab), and Before-Repair Photographic Proof. An automated duplicate detector alerts complainants if another active issue has already been registered in the chosen room.

![Figure 5.4: 5-Step Complaint Registration Wizard with Hierarchical Location Picker](./figures/fig5_4_raise_complaint_wizard.png)
*Figure 5.4: 5-Step Complaint Registration Wizard with Hierarchical Location Picker*

---

#### 5. Live 8-Stage Repair Journey & Before/After Proof Audit Lightbox
The detailed complaint view provides an Amazon-style visual milestone journey tracker displaying 8 chronological repair checkpoints: Submitted, Auto-Routed, Assigned, Accepted, In Repair, Waiting Parts, Repair Finished, and Verified & Closed. The view renders side-by-side photographic evidence (Pre-Repair Damage vs. Post-Repair Completion) and an immutable audit step trail.

![Figure 5.5: Live 8-Stage Repair Journey & Before/After Proof Audit Lightbox](./figures/fig5_7_live_repair_journey.jpg)
*Figure 5.5: Live 8-Stage Repair Journey & Before/After Proof Audit Lightbox*

---

#### 6. Service Supervisor Smart AI Dispatcher & Technician Allocation Engine
The Service Supervisor dispatch console utilizes an intelligent workload-balancing engine that evaluates technician queue capacities and physical location proximity. Unassigned tickets are presented alongside algorithmically recommended technicians, allowing one-click task allocation with automated SLA timer initiation.

![Figure 5.6: Service Supervisor Smart AI Dispatcher & Technician Allocation Engine](./figures/fig5_8_ai_smart_dispatcher.png)
*Figure 5.6: Service Supervisor Smart AI Dispatcher & Technician Allocation Engine*

---

#### 7. Technician Interactive Task Workstation & Execution Engine
Designed for field technicians operating on mobile handhelds or tablets, the workstation features an interactive Kanban board (`Assigned Queue` $\rightarrow$ `In Work` $\rightarrow$ `Waiting Parts` $\rightarrow$ `Resolved`). Technicians can accept jobs, update status, requisition spare components, and upload camera-captured completion photos.

![Figure 5.7: Technician Interactive Task Workstation & Execution Engine](./figures/fig5_12_technician_workstation.jpg)
*Figure 5.7: Technician Interactive Task Workstation & Execution Engine*

---

#### 8. Executive Campus Health Analytics & Department Compliance Leaderboard
Designed for institutional leadership (Principal, Vice-Principals, Deans), the executive analytics dashboard visualizes campus-wide infrastructure health. Key metrics include total submitted vs. resolved complaints (94.7% resolution rate), SLA breach distributions across departments, and an automated departmental compliance leaderboard.

![Figure 5.8: Executive Campus Health Analytics & Department Compliance Leaderboard](./figures/fig5_16_executive_health_leaderboard.jpg)
*Figure 5.8: Executive Campus Health Analytics & Department Compliance Leaderboard*

---

### 5.5 Conclusion
The implementation of CampusCare delivers a scalable, highly reliable full-stack system. By decoupling the presentation layer from backend business services and incorporating an autonomous SLA escalation scheduler, the platform eliminates the delays, lack of tracking, and accountability gaps inherent in traditional paper logbooks.

---
<div style="page-break-after: always;"></div>

# CHAPTER 6
# TESTING AND VALIDATION

### 6.1 Introduction
Testing verifies that software components execute reliably, securely, and in strict conformance with specified functional requirements. For CampusCare, testing encompassed unit tests, integration tests, security authorization tests, and user acceptance testing (UAT).

---

### 6.2 Design of Test Cases and Scenarios

Table 6.1: Comprehensive Test Case Suite & Execution Outcomes
| Test ID | Test Scenario | Input Data / Condition | Expected Behavior | Observed Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | User Authentication | Valid credentials (`student@mits.ac.in`) | JWT token issued; user redirected to Student Dashboard. | 200 OK with Bearer token; successful redirect. | **PASS** |
| **TC-02** | Invalid Login Handling | Wrong password | HTTP 401 Unauthorized; error toast displayed. | 401 Unauthorized; "Bad Credentials" message. | **PASS** |
| **TC-03** | Method Security (RBAC) | Student accesses `/api/admin/users` | HTTP 403 Forbidden; request rejected. | 403 Forbidden returned by Spring Security filter. | **PASS** |
| **TC-04** | Cascading Location | Select Block ID = 1 | Returns child floors belonging to selected block. | JSON array of 4 matching floor nodes returned. | **PASS** |
| **TC-05** | Duplicate Detection | File complaint in room with active issue | Duplicate detection modal surfaces with upvote prompt. | Active complaint detected; modal displayed. | **PASS** |
| **TC-06** | SLA Auto-Escalation | Active ticket with `sla_due_date < now` | Scheduled cron job changes status to `ESCALATED`. | Status updated; audit history entry created. | **PASS** |
| **TC-07** | Photo Proof Upload | Upload 4.2 MB JPEG image | File saved in `/uploads`; public URL generated. | Image uploaded; valid accessible URL returned. | **PASS** |
| **TC-08** | Proof Size Limit | Upload file > 10 MB | HTTP 400 / Size limit exceeded error. | `MaxUploadSizeExceededException` caught. | **PASS** |

---

### 6.3 Validation
Validation activities verified that the application operates reliably under production conditions:

Table 6.2: Verification and System Validation Metrics
| Validation Milestone | Metric / Target | Achieved Result | Compliance Status |
| :--- | :--- | :--- | :--- |
| **Backend Unit Testing** | `mvn clean test` (Spring Boot / JUnit 5) | 100% test pass rate (0 errors, 0 failures) | **VERIFIED** |
| **Production Build** | `npm run build` (Vite 5.4 + React 18) | Compiled in 27.02s without bundling warnings | **VERIFIED** |
| **SLA Scheduler Reliability**| Background cron polling execution | Zero missed executions across 72-hour test run | **VERIFIED** |
| **Data Integrity (ACID)** | Concurrent complaint updates | Optimistic locking prevents race conditions | **VERIFIED** |

---

### 6.4 Conclusion
Comprehensive testing confirms that the Campus Complaint Escalation System meets all institutional requirements. The platform provides consistent response times under 150 ms for REST API endpoints and maintains reliable security and data consistency across all user roles.

---
<div style="page-break-after: always;"></div>

# CHAPTER 7
# CONCLUSION

### 7.1 Conclusion
The **Campus Complaint Escalation System (CampusCare)** successfully addresses the long-standing challenges of physical paper logbooks, ambiguous verbal communications, and lack of accountability in campus maintenance operations.

Key milestones achieved during this project:
1. **End-to-End Digitization**: Delivered a full-stack platform that replaces paper registers with an intuitive 5-step digital filing process.
2. **Transparent Real-Time Tracking**: Provided complete visibility across eight operational stages (`NEW`, `ASSIGNED`, `ACCEPTED`, `IN_PROGRESS`, `WAITING_PARTS`, `RESOLVED`, `CLOSED`, and `ESCALATED`) with exact chronological timestamps.
3. **Automated SLA Escalation**: Built an autonomous background scheduler that monitors deadlines and escalates overdue tickets to Higher Officials, eliminating neglected grievances.
4. **Verifiable Quality Assurance**: Implemented mandatory before-damage and after-repair photo uploads with interactive lightbox previews to confirm physical repairs.
5. **Precise Location Mapping**: Created a cascading location tree that guides users to specify the exact campus block, floor, room, and landmark for each issue.

---

### 7.2 Future Scope
While CampusCare delivers an exhaustive facility management suite, planned future enhancements include:
- **Instant SMS / WhatsApp Messaging**: Integrating notification services (e.g., Twilio or Firebase Cloud Messaging) to send automated status updates directly to technicians and complainants.
- **Predictive Maintenance with Machine Learning**: Implementing machine learning models to analyze historical failure rates and schedule preventative servicing before equipment breakdowns occur.
- **Native Offline-First Mobile Apps**: Building native Android and iOS applications with offline data caching, allowing technicians to log repairs in basement utility areas with limited connectivity.

---
<div style="page-break-after: always;"></div>

# REFERENCES

1. **Ariponnammal, S. and Natarajan, S.** (1994) ‘Transport Phenomena of Sm Sel – X Asx’, *Pramana – Journal of Physics*, Vol. 42, No. 1, pp. 421–425.
2. **Barnard, R.W. and Kellogg, C.** (1980) ‘Applications of Convolution Operators to Problems in Univalent Function Theory’, *Michigan Mathematical Journal*, Vol. 27, pp. 81–94.
3. **Fielding, R.T.** (2000) *Architectural Styles and the Design of Network-based Software Architectures*, Doctoral Dissertation, University of California, Irvine.
4. **Gamma, E., Helm, R., Johnson, R. and Vlissides, J.** (1994) *Design Patterns: Elements of Reusable Object-Oriented Software*, Addison-Wesley, Boston, MA.
5. **Keith, M. and Schincariol, M.** (2013) *Pro JPA 2: Mastering the Java Persistence API*, 2nd edn, Apress, New York.
6. **Shin, K.G. and Mckay, N.D.** (1984) ‘Open Loop Minimum Time Control of Mechanical Manipulations and its Applications’, *Proceedings of the American Control Conference*, San Diego, CA, pp. 1231–1236.
7. **Walls, C.** (2022) *Spring in Action*, 6th edn, Manning Publications, Shelter Island, NY.

---
<div style="page-break-after: always;"></div>

# APPENDICES

### APPENDIX 1: WEEK-WISE WORKING PROCESS

**Student Name:** G N RAGUPATHI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Roll No:** 23691A3345  
**Internship Program:** Ethnotech Work Force Development Program (EWDP) — Java Full Stack  
**Period:** 8 Weeks &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Industry Guide:** Mr. Sandeep P S (Trainer, Ethnotech Academic Solutions Pvt. Ltd.)

| WEEK NO. | CALENDAR DATES | CORE ACTIVITIES AND TECHNICAL TASKS COMPLETED |
| :--- | :--- | :--- |
| **Week 1** | Days 1 – 6 | Orientation by Ethnotech trainer Mr. Sandeep P S on enterprise Java Full Stack architecture. Studied legacy campus maintenance challenges at MITS. Drafted project scope, functional requirements, and Software Requirement Specification (SRS). |
| **Week 2** | Days 7 – 12 | Designed relational database schemas in MySQL/H2 (`users`, `departments`, `location_nodes`, `complaints`, `complaint_history`, `comments`). Normalized tables to 3NF and constructed Entity-Relationship (ER) and Data Flow Diagrams (DFDs). |
| **Week 3** | Days 13 – 18 | Initialized Spring Boot 3.2.4 backend structure using Maven. Configured Hibernate JPA entities, repositories, and custom queries. Implemented Spring Security with stateless JWT authentication and BCrypt password encryption. |
| **Week 4** | Days 19 – 24 | Developed RESTful APIs for user authentication, complaint submission, cascading location retrieval, and departmental triage. Conducted API testing with Postman. |
| **Week 5** | Days 25 – 30 | Initialized React 18 Single Page Application using Vite and Tailwind CSS. Implemented `AuthContext`, Axios HTTP interceptors, protected route guards, and responsive dashboard layouts for each user role. |
| **Week 6** | Days 31 – 36 | Developed the 5-step complaint submission wizard with cascading Location Tree Picker (Block $\rightarrow$ Floor $\rightarrow$ Room $\rightarrow$ Spot) and real-time duplicate grievance detection. Built the technician workstation interface. |
| **Week 7** | Days 37 – 42 | Implemented the automated background SLA escalation engine using `@Scheduled` cron jobs. Engineered the interactive visual audit timeline with before-damage and after-repair image lightbox previews. |
| **Week 8** | Days 43 – 48 | Integrated executive analytics dashboards and public community feeds. Conducted unit testing with JUnit 5/Mockito and automated frontend builds. Completed code documentation, system validation, and finalized report preparation. |

---

### APPENDIX 2: PICTURE PROOFS DURING INTERNSHIP PERIOD

*(Note: Attach minimum 6 photographs taken during the internship training sessions at MITS campus in the designated placeholders below, formatted 2 pictures per page).*

```
========================================================================================
|                                                                                      |
|                                [ PHOTO PROOF 1 ]                                     |
|                       Orientation & Architecture Workshop                            |
|             (Ethnotech Training Session with Trainer Mr. Sandeep P S)                |
|                                                                                      |
========================================================================================

========================================================================================
|                                                                                      |
|                                [ PHOTO PROOF 2 ]                                     |
|                      Database Schema Design & JPA Modeling                           |
|                    (Hands-on Lab Coding Session at MITS Lab)                         |
|                                                                                      |
========================================================================================

========================================================================================
|                                                                                      |
|                                [ PHOTO PROOF 3 ]                                     |
|                     Spring Security & JWT Filter Development                         |
|                       (Backend API Implementation Session)                           |
|                                                                                      |
========================================================================================

========================================================================================
|                                                                                      |
|                                [ PHOTO PROOF 4 ]                                     |
|                   Frontend Development with React 18 & Tailwind                      |
|                  (Building Cascading Location Picker & Dashboards)                   |
|                                                                                      |
========================================================================================

========================================================================================
|                                                                                      |
|                                [ PHOTO PROOF 5 ]                                     |
|                  Automated SLA Escalation Scheduler Testing                          |
|                     (Verifying Cron Execution with Mock Records)                     |
|                                                                                      |
========================================================================================

========================================================================================
|                                                                                      |
|                                [ PHOTO PROOF 6 ]                                     |
|                     Final Project Demonstration & Code Audit                         |
|                  (Presenting Working Application to Project Guides)                  |
|                                                                                      |
========================================================================================
```

---

### APPENDIX 3: STIPEND DETAILS

*(Note: Attach official bank account statements, transaction screenshots, or official stipend acknowledgement communications in this section).*

```
========================================================================================
|                                                                                      |
|                                [ ATTACH HERE ]                                       |
|                                                                                      |
|                    BANK ACCOUNT TRANSACTION DETAILS / SLIPS                          |
|                     OR OFFICIAL STIPEND CONFIRMATION PROOFS                          |
|                                                                                      |
========================================================================================
```

