// package rest.app;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebMvcConfig implements WebMvcConfigurer {

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        long MAX_AGE_SECS = 3600;
//        registry.addMapping("/**")
//        .allowedOrigins("http://localhost:3000", "http://localhost:3001")
//        .allowedMethods("GET", "POST", "PUT", "DELETE")
//        .allowedHeaders("*")
//        .allowCredentials(true)
//        .maxAge(MAX_AGE_SECS);
//    }
// }
