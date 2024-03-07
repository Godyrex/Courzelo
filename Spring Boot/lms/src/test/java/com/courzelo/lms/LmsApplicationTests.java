package com.courzelo.lms;

import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.services.ElementModuleService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static com.mongodb.assertions.Assertions.assertFalse;
import static com.mongodb.assertions.Assertions.assertTrue;
import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LmsApplicationTests {

    @Test
    void contextLoads() {
        assertNull(null);
    }
    @Test
        //@Order(1)
    void testStringEmpty() {
        ElementModule elementModule = new ElementModule();
        elementModule.setName(null); // Set the name to null for testing
       assertEquals(null, elementModule.getName(), "The name is null");
    }

}
