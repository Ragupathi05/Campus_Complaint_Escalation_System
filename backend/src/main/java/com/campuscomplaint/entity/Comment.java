package com.campuscomplaint.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "attachment_url")
    private String attachmentUrl;

    public Comment() {}

    public Comment(Complaint complaint, User author, String text, String attachmentUrl) {
        this.complaint = complaint;
        this.author = author;
        this.text = text;
        this.attachmentUrl = attachmentUrl;
    }

    public static CommentBuilder builder() { return new CommentBuilder(); }

    public static class CommentBuilder {
        private Complaint complaint;
        private User author;
        private String text;
        private String attachmentUrl;

        public CommentBuilder complaint(Complaint complaint) { this.complaint = complaint; return this; }
        public CommentBuilder author(User author) { this.author = author; return this; }
        public CommentBuilder text(String text) { this.text = text; return this; }
        public CommentBuilder attachmentUrl(String attachmentUrl) { this.attachmentUrl = attachmentUrl; return this; }
        public Comment build() { return new Comment(complaint, author, text, attachmentUrl); }
    }

    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getAttachmentUrl() { return attachmentUrl; }
    public void setAttachmentUrl(String attachmentUrl) { this.attachmentUrl = attachmentUrl; }
}
