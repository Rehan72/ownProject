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
      {
        id: "3",
        name: "Michael Johnson",
        email: "michael@example.com",
        role: "CTO",
        status: "inactive",
        lastLogin: "2023-05-28",
        members: [
          {
            id: "3-1",
            name: "Sophia Lee",
            email: "sophia@example.com",
            role: "Engineer",
            status: "active",
          },
          {
            id: "3-2",
            name: "James White",
            email: "james@example.com",
            role: "System Architect",
            status: "inactive",
          },
          {
            id: "3-3",
            name: "Lucas Brown",
            email: "lucas@example.com",
            role: "DevOps Engineer",
            status: "active",
          },
          {
            id: "3-4",
            name: "Mia Adams",
            email: "mia@example.com",
            role: "IT Support",
            status: "inactive",
          },
          {
            id: "3-5",
            name: "Ethan Scott",
            email: "ethan@example.com",
            role: "Project Manager",
            status: "active",
          },
        ],
      },
      {
        id: "4",
        name: "Olivia Martinez",
        email: "olivia@example.com",
        role: "CEO",
        status: "active",
        lastLogin: "2023-05-25",
        members: [
          {
            id: "4-1",
            name: "Lily Taylor",
            email: "lily@example.com",
            role: "Business Analyst",
            status: "active",
          },
          {
            id: "4-2",
            name: "Mason Clark",
            email: "mason@example.com",
            role: "Customer Support",
            status: "inactive",
          },
          {
            id: "4-3",
            name: "Aiden Adams",
            email: "aiden@example.com",
            role: "Operations Manager",
            status: "active",
          },
          {
            id: "4-4",
            name: "Emily Scott",
            email: "emily@example.com",
            role: "UI/UX Designer",
            status: "inactive",
          },
          {
            id: "4-5",
            name: "William Jones",
            email: "william@example.com",
            role: "Sales Lead",
            status: "active",
          },
        ],
      },
      {
        id: "5",
        name: "Zoe Walker",
        email: "zoe@example.com",
        role: "Product Owner",
        status: "active",
        lastLogin: "2023-06-15",
        members: [
          {
            id: "5-1",
            name: "John White",
            email: "johnw@example.com",
            role: "Engineer",
            status: "active",
          },
          {
            id: "5-2",
            name: "Sarah Lee",
            email: "sarah@example.com",
            role: "Content Writer",
            status: "inactive",
          },
          {
            id: "5-3",
            name: "Peter Green",
            email: "peter@example.com",
            role: "UI Developer",
            status: "active",
          },
        ],
      },
      {
        id: "6",
        name: "Liam Cooper",
        email: "liam@example.com",
        role: "Team Lead",
        status: "inactive",
        lastLogin: "2023-07-01",
        members: [
          {
            id: "6-1",
            name: "Isabella Martin",
            email: "isabella@example.com",
            role: "Researcher",
            status: "active",
          },
          {
            id: "6-2",
            name: "Nora Jackson",
            email: "nora@example.com",
            role: "Data Scientist",
            status: "inactive",
          },
          {
            id: "6-3",
            name: "Sophia Harris",
            email: "sophia@example.com",
            role: "Business Development",
            status: "active",
          },
        ],
      },
      {
        id: "7",
        name: "David Lee",
        email: "david@example.com",
        role: "Software Engineer",
        status: "active",
        lastLogin: "2023-06-20",
        members: [
          {
            id: "7-1",
            name: "Sophia Green",
            email: "sophia@example.com",
            role: "Product Owner",
            status: "inactive",
          },
          {
            id: "7-2",
            name: "Jackson White",
            email: "jackson@example.com",
            role: "QA Engineer",
            status: "active",
          },
        ],
      },
      {
        id: "8",
        name: "Amelia Collins",
        email: "amelia@example.com",
        role: "Team Manager",
        status: "active",
        lastLogin: "2023-06-10",
        members: [
          {
            id: "8-1",
            name: "Leo Scott",
            email: "leo@example.com",
            role: "Operations Lead",
            status: "inactive",
          },
          {
            id: "8-2",
            name: "Luna Carter",
            email: "luna@example.com",
            role: "Project Coordinator",
            status: "active",
          },
        ],
      },
      {
        id: "9",
        name: "Matthew Evans",
        email: "matthew@example.com",
        role: "Engineer",
        status: "active",
        lastLogin: "2023-06-28",
        members: [
          {
            id: "9-1",
            name: "James Turner",
            email: "james@example.com",
            role: "Developer",
            status: "active",
          },
        ],
      },
      {
        id: "10",
        name: "Ella Reed",
        email: "ella@example.com",
        role: "Designer",
        status: "inactive",
        lastLogin: "2023-05-30",
        members: [
          {
            id: "10-1",
            name: "Zachary Lee",
            email: "zachary@example.com",
            role: "UX Designer",
            status: "active",
          },
          {
            id: "10-2",
            name: "Ava Brown",
            email: "ava@example.com",
            role: "Front-end Developer",
            status: "inactive",
          },
        ],
      },
      {
        id: "3",
        name: "Michael Johnson",
        email: "michael@example.com",
        role: "CTO",
        status: "inactive",
        lastLogin: "2023-05-28",
        members: [
          {
            id: "3-1",
            name: "Sophia Lee",
            email: "sophia@example.com",
            role: "Engineer",
            status: "active",
          },
          {
            id: "3-2",
            name: "James White",
            email: "james@example.com",
            role: "System Architect",
            status: "inactive",
          },
          {
            id: "3-3",
            name: "Lucas Brown",
            email: "lucas@example.com",
            role: "DevOps Engineer",
            status: "active",
          },
          {
            id: "3-4",
            name: "Mia Adams",
            email: "mia@example.com",
            role: "IT Support",
            status: "inactive",
          },
          {
            id: "3-5",
            name: "Ethan Scott",
            email: "ethan@example.com",
            role: "Project Manager",
            status: "active",
          },
        ],
      },
      {
        id: "4",
        name: "Olivia Martinez",
        email: "olivia@example.com",
        role: "CEO",
        status: "active",
        lastLogin: "2023-05-25",
        members: [
          {
            id: "4-1",
            name: "Lily Taylor",
            email: "lily@example.com",
            role: "Business Analyst",
            status: "active",
          },
          {
            id: "4-2",
            name: "Mason Clark",
            email: "mason@example.com",
            role: "Customer Support",
            status: "inactive",
          },
          {
            id: "4-3",
            name: "Aiden Adams",
            email: "aiden@example.com",
            role: "Operations Manager",
            status: "active",
          },
          {
            id: "4-4",
            name: "Emily Scott",
            email: "emily@example.com",
            role: "UI/UX Designer",
            status: "inactive",
          },
          {
            id: "4-5",
            name: "William Jones",
            email: "william@example.com",
            role: "Sales Lead",
            status: "active",
          },
        ],
      },
      {
        id: "5",
        name: "Zoe Walker",
        email: "zoe@example.com",
        role: "Product Owner",
        status: "active",
        lastLogin: "2023-06-15",
        members: [
          {
            id: "5-1",
            name: "John White",
            email: "johnw@example.com",
            role: "Engineer",
            status: "active",
          },
          {
            id: "5-2",
            name: "Sarah Lee",
            email: "sarah@example.com",
            role: "Content Writer",
            status: "inactive",
          },
          {
            id: "5-3",
            name: "Peter Green",
            email: "peter@example.com",
            role: "UI Developer",
            status: "active",
          },
        ],
      },
      {
        id: "6",
        name: "Liam Cooper",
        email: "liam@example.com",
        role: "Team Lead",
        status: "inactive",
        lastLogin: "2023-07-01",
        members: [
          {
            id: "6-1",
            name: "Isabella Martin",
            email: "isabella@example.com",
            role: "Researcher",
            status: "active",
          },
          {
            id: "6-2",
            name: "Nora Jackson",
            email: "nora@example.com",
            role: "Data Scientist",
            status: "inactive",
          },
          {
            id: "6-3",
            name: "Sophia Harris",
            email: "sophia@example.com",
            role: "Business Development",
            status: "active",
          },
        ],
      },
      {
        id: "7",
        name: "David Lee",
        email: "david@example.com",
        role: "Software Engineer",
        status: "active",
        lastLogin: "2023-06-20",
        members: [
          {
            id: "7-1",
            name: "Sophia Green",
            email: "sophia@example.com",
            role: "Product Owner",
            status: "inactive",
          },
          {
            id: "7-2",
            name: "Jackson White",
            email: "jackson@example.com",
            role: "QA Engineer",
            status: "active",
          },
        ],
      },
      {
        id: "8",
        name: "Amelia Collins",
        email: "amelia@example.com",
        role: "Team Manager",
        status: "active",
        lastLogin: "2023-06-10",
        members: [
          {
            id: "8-1",
            name: "Leo Scott",
            email: "leo@example.com",
            role: "Operations Lead",
            status: "inactive",
          },
          {
            id: "8-2",
            name: "Luna Carter",
            email: "luna@example.com",
            role: "Project Coordinator",
            status: "active",
          },
        ],
      },
      {
        id: "9",
        name: "Matthew Evans",
        email: "matthew@example.com",
        role: "Engineer",
        status: "active",
        lastLogin: "2023-06-28",
        members: [
          {
            id: "9-1",
            name: "James Turner",
            email: "james@example.com",
            role: "Developer",
            status: "active",
          },
        ],
      },
      {
        id: "10",
        name: "Ella Reed",
        email: "ella@example.com",
        role: "Designer",
        status: "inactive",
        lastLogin: "2023-05-30",
        members: [
          {
            id: "10-1",
            name: "Zachary Lee",
            email: "zachary@example.com",
            role: "UX Designer",
            status: "active",
          },
          {
            id: "10-2",
            name: "Ava Brown",
            email: "ava@example.com",
            role: "Front-end Developer",
            status: "inactive",
          },
        ],
      },
    ];
  }
  