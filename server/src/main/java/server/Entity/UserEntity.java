package server.Entity;
import java.util.List;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user_entity")
public class UserEntity {

    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    @Id
    @Column(unique = true)
    private String userid;

    private String name;

    @Column(unique = true)
    private String email;

    private String bio;

    // @Lob
    // @Column(name = "profile_img", columnDefinition = "BYTEA")
    // private byte[] profileImg;

    private String password;
    private String varifyOtp;
    private Boolean isAccountVerified;
    private Long varifyOtpExpireAt;
    private String resetOtp;
    private Long resetOtpExpireAt;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NotesEntity> notes;
}
