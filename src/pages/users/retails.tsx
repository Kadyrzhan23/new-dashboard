import Template from "./user-card-template/UserCard";
import CustomUserCard from "./custom-user-card/user-card";
export default function retails() {
  const users = [
    {
      _id: "695b81c3777da2c4177f8b82",
      name: "Антон Сухов",
      phoneNumber: "+998903726734",
      type: "user",
      address: [
        {
          address: "ул. Афросияб, 2Б",
          organization: 'БЦ "Dalston"',
        },
      ],
      city: "",
      telegram: "anton_sukhov",
      avatarUrl: "",
      isActive: true,
      manager: {
        _id: {
          $oid: "672b419819fefd70b37ac5b6",
        },
        name: "Дина",
        chat_id: "",
        id: "672881973f145b99d65708d0",
        __v: 0,
      },
      basket: [],
      updates: "",
      regDate: "05/01/2026, 14:17:54",
      creationTime: 1766351612,
      identifier: "00779",
      __v: 0,
      birthday: {
        str: "1989-01-22",
        date: 601430400000,
        day: 22,
        month: 1,
        year: 1989,
      },
    },
  ];

  const mockUsers = [
    {
      _id: "42891",
      name: "Sarah Anderson",
      phoneNumber: "+1 (555) 123-4567",
      avatarUrl:
        "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzUyMDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      telegram: "sarahanderson",
      role: "user" as const,
    },
    {
      _id: "18456",
      name: "Emma Rodriguez",
      phoneNumber: "+1 (555) 246-8102",
      avatarUrl:
        "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2NzU2MTgwMnww&ixlib=rb-4.1.0&q=80&w=1080",
      role: "superUser" as const,
      // Note: No telegram handle for this user
    },
    {
      _id: "75293",
      name: "Michael Chen",
      phoneNumber: "+1 (555) 987-6543",
      avatarUrl:
        "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc1NzQwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      telegram: "mchen",
      role: "superUser" as const,
    },
  ];
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {mockUsers.map((user) => (
        <div key={user._id} className="mb-6 mr-6">
          <Template user={user} />
        </div>
      ))}
      {users.map((user: any) => (
        <div key={user.id} className="mb-6 mr-6">
          <CustomUserCard user={user} />
        </div>
      ))}
    </div>
  );
}
