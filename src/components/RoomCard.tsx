import { Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface RoomCardProps {
  name: string;
  dateCreated: string;
  participants: number;
}

const RoomCard = ({ name, dateCreated, participants }: RoomCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{dateCreated}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{participants} participants</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full hover:bg-secondary">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
