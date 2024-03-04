package com.courzelo.lms;

<<<<<<< Updated upstream
=======
import com.courzelo.lms.entities.TypeReclamation;
import com.courzelo.lms.repositories.TypeReclamationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
>>>>>>> Stashed changes
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LmsApplication.class, args);
    }

<<<<<<< Updated upstream
=======
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    CommandLineRunner runner(TypeReclamationRepository repository){
        return args ->{
            TypeReclamation type=new TypeReclamation(
                    "Finance"
            );
            repository.insert(type);
        };
    }

>>>>>>> Stashed changes
}
