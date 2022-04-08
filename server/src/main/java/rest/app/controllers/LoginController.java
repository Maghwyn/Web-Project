package rest.app.controllers;

public class LoginController {
    @RolesAllowed("STUDENT")
    @RequestMapping("/**")
    public String getStudent() {
        return "Welcome Student";
    }

    @RolesAllowed({"STUDENT","PO"})
    @RequestMapping("/po")
    public String getPo() {
		return "Welcome Po";
	}

    @RequestMapping("/*")
    public String getGoogle() {
       return "Welcome Google user!";
    }
}