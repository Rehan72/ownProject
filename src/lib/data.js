// Define the structure of ChildUser
export const ChildUser = {
    id: String,
    name: String,
    email: String,
    role: String,
    status: ["active", "inactive"]
  };
  
  // Define the structure of Team
  export const Team = {
    id: String,
    name: String,
    members: [ChildUser]
  };
  
  // Define the structure of Project
  export const Project = {
    id: String,
    name: String,
    status: ["ongoing", "completed", "planned"],
    members: [ChildUser]
  };
  
  // Define the structure of User
  export const User = {
    id: String,
    name: String,
    email: String,
    role: String,
    status: ["active", "inactive"],
    lastLogin: String,
    members: [ChildUser]
  };
  
  // Function to fetch data (simulating an API call)
  export async function fetchData() {
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "active",
        lastLogin: "2023-06-01",
        members: [
          {
            id: "1-1",
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "Developer",
            status: "active",
          },
          {
            id: "1-2",
            name: "Bob Smith",
            email: "bob@example.com",
            role: "Designer",
            status: "active",
          },
        ],
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Manager",
        status: "active",
        lastLogin: "2023-06-02",
        members: [
          {
            id: "2-1",
            name: "David Brown",
            email: "david@example.com",
            role: "Sales Representative",
            status: "active",
          },
        ],
      },
    ];
  }
  