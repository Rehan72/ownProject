// ChildUser Type Definition (not used in JS, but added for clarity)

export const ChildUser = {
    id: "string",
    name: "string",
    email: "string",
    role: "string",
    status: "active" | "inactive"
  };
  
  // Project Type Definition (not used in JS, but added for clarity)
 export const Project = {
    id: "string",
    name: "string",
    status: "ongoing" | "completed" | "planned",
    members: [ChildUser]
  };
  
  // User Type Definition (not used in JS, but added for clarity)
 export const User = {
    id: "string",
    name: "string",
    email: "string",
    role: "string",
    status: "active" | "inactive",
    lastLogin: "string",
    teams: [
      {
        id: "string",
        name: "string",
        members: [ChildUser]
      }
    ],
    projects: [Project]
  };
  
  // Fetching data function
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
        teams: [
          {
            id: "t1",
            name: "Development Team",
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
            id: "t2",
            name: "Marketing Team",
            members: [
              {
                id: "1-3",
                name: "Carol Williams",
                email: "carol@example.com",
                role: "Marketing Specialist",
                status: "active",
              },
            ],
          },
        ],
        projects: [
          {
            id: "p1",
            name: "Website Redesign",
            status: "ongoing",
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
            id: "p2",
            name: "Mobile App Development",
            status: "planned",
            members: [
              {
                id: "1-1",
                name: "Alice Johnson",
                email: "alice@example.com",
                role: "Developer",
                status: "active",
              },
            ],
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
        teams: [
          {
            id: "t3",
            name: "Sales Team",
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
        ],
        projects: [
          {
            id: "p3",
            name: "Client Outreach Program",
            status: "ongoing",
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
        ],
      },
    ];
  }
  