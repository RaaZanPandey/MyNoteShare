package server.Io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FeedbackRequest {
    private String userId;
    private String subject;
    private String type;
    private String description;
}
