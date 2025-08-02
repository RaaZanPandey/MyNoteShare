package server.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import server.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    UserEntity findByUserid(String userid);

    Boolean existsByEmail(String email);

}
