package com.mohsen.chat.resources;


import com.google.gson.Gson;
import com.mohsen.chat.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "/test.properties")
class UserControllerTests {

    String email = "testUser@test.test";
    String name = "testUser";
    String password = "testUser123";

    @Autowired
    private MockMvc mockMvc;
    @Test
    public void testCreateUser() throws Exception {
        User user = new User();
        user.setEmail( email + "create" );
        user.setName( name );
        user.setPassword( password );
        createUser( user );
        deleteUser( user.getEmail() );
    }

    @Test
    public void testGetUsers() throws Exception {
        User user = new User();
        user.setEmail( email + "GetUsers" );
        user.setName( name );
        user.setPassword( password );
        createUser( user );
        createUser( user );
        createUser( user );
        getUsers();
        deleteUser( user.getEmail() );
    }

    @Test
    public void testSuccessLogin() throws Exception {
        User user = new User();
        user.setEmail( email + "Login" );
        user.setName( name );
        user.setPassword( password );
        createUser( user );
        login( user.getEmail(), user.getPassword(), "OK" );
        deleteUser( user.getEmail() );
    }

    @Test
    public void testUnsuccessfulLoginWrongEmail() throws Exception {
        User user = new User();
        user.setEmail( email + "Login" );
        user.setName( name );
        user.setPassword( password );
        createUser( user );
        login( "WrongEmail@email.com", user.getPassword(), "NOT FOUND" );
        deleteUser( user.getEmail() );
    }

    @Test
    public void testUnsuccessfulLoginWrongPassword() throws Exception {
        User user = new User();
        user.setEmail( email + "Login" );
        user.setName( name );
        user.setPassword( password );
        createUser( user );
        login( user.getEmail(), "WrongPassword", "NOT FOUND" );
        deleteUser( user.getEmail() );
    }

    @Test
    public void testUnsuccessfulLoginEmptyFields() throws Exception {
        User user = new User();
        user.setEmail( email + "Login" );
        user.setName( name );
        user.setPassword( password );
        createUser( user );
        login( "", "", "NOT FOUND" );
        deleteUser( user.getEmail() );
    }

    @Test
    public void deleteUser() throws Exception {
        User user = new User();
        user.setEmail( email + "Delete" );
        user.setName( name );
        user.setPassword( password );
        createUser( user );
        deleteUser( user.getEmail() );
    }


    public void createUser( User user ) throws Exception {
        Gson gson = new Gson();
        String jsonUser = gson.toJson( user );
        MvcResult result = mockMvc.perform( MockMvcRequestBuilders.post( "/register" )
                .content( jsonUser )
                .contentType( MediaType.APPLICATION_JSON )
                .accept( MediaType.APPLICATION_JSON ) )
                .andExpect( status().isCreated() )
                .andReturn();
    }

    public void deleteUser( String dEmail ) throws Exception {
        MvcResult result = mockMvc.perform(
                MockMvcRequestBuilders.delete( "/user" )
                        .contentType( MediaType.APPLICATION_JSON )
                        .accept( MediaType.APPLICATION_JSON ).param( "email", dEmail )
        )
                .andExpect( status().isOk() )
                .andReturn();
    }

    public void getUsers() throws Exception {
        MvcResult result = mockMvc.perform( MockMvcRequestBuilders.get( "/users" )
                .contentType( MediaType.APPLICATION_JSON )
                .accept( MediaType.APPLICATION_JSON ) )
                .andExpect( status().isOk() )
                .andReturn();

//        Gson gson = new Gson();
//        String stringUsers = result.getResponse().getContentAsString();
//        List<User> users = gson.fromJson( stringUsers, new TypeToken<List<User>>() {}.getType() );
//        System.out.print( users );
//        assertNotNull(  );
//        assertEquals( ,  );
    }

    public void login( String email, String password, String status ) throws Exception {
        MvcResult result = mockMvc.perform(
                MockMvcRequestBuilders.get( "/login" )
                        .contentType( MediaType.APPLICATION_JSON )
                        .accept( MediaType.APPLICATION_JSON )
                        .header( "email", email )
                        .header( "password", password )
        )
                .andExpect(
                        status == "OK"
                                ? status().isOk()
                                : status == "NOT FOUND"
                                ? status().isNotFound()
                                : status().is5xxServerError()
                )
                .andReturn();
        String res = result.getResponse().getContentAsString();

        System.out.print( res );
    }
}

