package server.Io;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteResponse {
    String id;
    String title;
    String description;
    private String fileType;
    String createdBy;
    LocalDate createdAt;
}
