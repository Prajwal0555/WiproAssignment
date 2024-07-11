package com.wipro.bus.dto;

public class UserDetailResponse {
    // select u1_0.user_id,u1_0.address,u1_0.email,u1_0.name,u1_0.password,u1_0.phone_number from user u1_0 where u1_0.email=?

    String user_id;
    String address;
    String email;
    String name;
    String password;
    String phone_number;
    
    public String getUser_id() {
        return user_id;
    }
    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhone_number() {
        return phone_number;
    }
    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }
    @Override
    public String toString() {
        return "UserDetailResponse [user_id=" + user_id + ", address=" + address + ", email=" + email + ", name=" + name
                + ", password=" + password + ", phone_number=" + phone_number + "]";
    }
    
}
