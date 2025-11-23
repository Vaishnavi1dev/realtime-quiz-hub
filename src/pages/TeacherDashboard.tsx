import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, LogOut, Trophy, BookOpen, Users, Play, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
    } else {
      setUser(JSON.parse(userData));
    }

    const savedQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
    setQuizzes(savedQuizzes);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const conductQuiz = (quiz: any) => {
    localStorage.setItem("activeQuiz", JSON.stringify(quiz));
    localStorage.setItem("quizSettings", JSON.stringify({ 
      difficulty: quiz.difficulty, 
      mode: "timed" 
    }));
    navigate("/teacher-conduct-quiz");
  };

  const deleteQuiz = (quizId: string) => {
    const updatedQuizzes = quizzes.filter((q) => q.id !== quizId);
    localStorage.setItem("teacherQuizzes", JSON.stringify(updatedQuizzes));
    setQuizzes(updatedQuizzes);
    toast.success("Quiz deleted successfully");
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Teacher Portal
            </h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-accent">
              <AvatarFallback className="bg-gradient-to-br from-accent to-accent/80 text-primary-foreground text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-base">{user.email}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  Teacher
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{quizzes.length}</p>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Trophy className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              My Quizzes
            </h2>
            <Button onClick={() => navigate("/teacher-create-quiz")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </div>

          {quizzes.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No quizzes yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first quiz to get started
                </p>
                <Button onClick={() => navigate("/teacher-create-quiz")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Quiz
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="border-2 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{quiz.title}</CardTitle>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" className="capitalize">
                            {quiz.difficulty}
                          </Badge>
                          <Badge variant="secondary">
                            {quiz.questions.length} Questions
                          </Badge>
                          <Badge variant="secondary">
                            {Math.floor(quiz.timeLimit / 60)}min
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => conductQuiz(quiz)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Conduct Quiz
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteQuiz(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
