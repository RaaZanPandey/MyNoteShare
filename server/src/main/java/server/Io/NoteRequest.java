package server.Io;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteRequest {
    @NotBlank(message = "Title should not be blank")
    private String title;
    @NotBlank(message = "Descripton should not be blank")
    private String description;
    private String createdBy;
    @NotBlank(message = "Files should be added")
    private MultipartFile fileUrl;
}
