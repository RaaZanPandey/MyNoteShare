package server.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "notes_entity")
public class NotesEntity {
    
    @Id
    private String note_id;
    private String title;
    private String description;

    @JoinColumn(name = "userid")
    private String createdBy;
    private LocalDate createdAt;
    private String fileName;
    private String fileType;

    @Lob
    @Column(length = 100000000)
    private byte[] fileContent;

}
