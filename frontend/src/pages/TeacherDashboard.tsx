import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, LogOut, Trophy, BookOpen, Users, Play, Trash2, BarChart3, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
      loadQuizzesFromDB();
    }
  }, [navigate]);

  const loadQuizzesFromDB = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const response = await fetch('http://localhost:5000/api/quiz', {
          headers: {
            'x-auth-token': authToken,
          },
        });
        
        if (response.ok) {
          const dbQuizzes = await response.json();
          console.log('✅ Loaded', dbQuizzes.length, 'quizzes from database');
          
          // Convert database format to frontend format
          const formattedQuizzes = dbQuizzes.map((dbQuiz: any) => ({
            id: dbQuiz._id,
            title: dbQuiz.title,
            difficulty: dbQuiz.difficulty,
            timeLimit: dbQuiz.timeLimit,
            questions: dbQuiz.questions,
            createdAt: dbQuiz.createdAt
          }));
          
          setQuizzes(formattedQuizzes);
          localStorage.setItem("teacherQuizzes", JSON.stringify(formattedQuizzes));
        }
      }
    } catch (error) {
      console.log('⚠️ Could not load quizzes from database');
      // Fallback to localStorage
      const savedQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
      setQuizzes(savedQuizzes);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const conductQuiz = (quiz: any) => {
    localStorage.setItem("activeQuiz", JSON.stringify(quiz));
    localStorage.setItem("quizSettings", JSON.stringify({ 
      difficulty: quiz.difficulty, 
      mode: "timed" 
    }));
    navigate("/teacher-conduct-quiz");
  };

  const deleteQuiz = async (quizId: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      if (authToken) {
        const response = await fetch(`http://localhost:5000/api/quiz/${quizId}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': authToken,
          },
        });
        
        if (response.ok) {
          console.log('✅ Quiz deleted from database');
          const updatedQuizzes = quizzes.filter((q) => q.id !== quizId);
          setQuizzes(updatedQuizzes);
          localStorage.setItem("teacherQuizzes", JSON.stringify(updatedQuizzes));
          toast.success("Quiz deleted successfully");
        } else {
          toast.error("Failed to delete quiz");
        }
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      toast.error("Failed to delete quiz");
    }
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  // Mock analytics data
  const analytics = {
    totalStudents: 45,
    activeQuizzes: quizzes.length,
    completedQuizzes: 23,
    averageScore: 78,
    topPerformers: [
      { name: "Alice Johnson", score: 95, quizzes: 12 },
      { name: "Bob Smith", score: 92, quizzes: 10 },
      { name: "Carol Davis", score: 89, quizzes: 11 }
    ],
    recentActivity: [
      { student: "John Doe", quiz: "Math Quiz 1", score: 85, time: "2 hours ago" },
      { student: "Jane Smith", quiz: "Science Quiz", score: 92, time: "3 hours ago" },
      { student: "Mike Wilson", quiz: "History Quiz", score: 78, time: "5 hours ago" }
    ]
  };

  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Left Sidebar */}
      <aside className="w-80 border-r backdrop-blur-sm p-6 space-y-6">
        {/* Profile Card */}
        <Card className="hologram-card animate-slide-in-left">
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto border-2 border-accent mb-3">
              <AvatarFallback className="bg-gradient-to-br from-accent to-accent/80 text-primary-foreground text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription className="text-sm">{user.email}</CardDescription>
            <div className="flex gap-2 mt-3 justify-center">
              <Badge variant="secondary">Teacher</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <Card className="hologram-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full" 
              variant="hologram"
              onClick={() => navigate("/teacher-create-quiz")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button variant="outline" onClick={handleLogout} className="w-full">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Analytics Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
            <BarChart3 className="w-8 h-8" style={{ color: '#ffffff' }} />
            Student Analytics
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="hologram-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.totalStudents}</p>
                    <p className="text-sm opacity-70">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hologram-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.activeQuizzes}</p>
                    <p className="text-sm opacity-70">Active Quizzes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hologram-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Trophy className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.completedQuizzes}</p>
                    <p className="text-sm opacity-70">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hologram-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.averageScore}%</p>
                    <p className="text-sm opacity-70">Avg Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="hologram-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm opacity-70">{student.quizzes} quizzes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-500">{student.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="hologram-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="p-3 bg-white/10 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold">{activity.student}</p>
                        <Badge variant="outline">{activity.score}%</Badge>
                      </div>
                      <p className="text-sm opacity-70">{activity.quiz}</p>
                      <p className="text-xs opacity-50 mt-1">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Quizzes Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
            <BookOpen className="w-8 h-8" style={{ color: '#ffffff' }} />
            My Quizzes
          </h2>

          {quizzes.length === 0 ? (
            <Card className="hologram-card border-2 border-dashed">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No quizzes yet</h3>
                <p className="opacity-70 mb-6">
                  Create your first quiz to get started
                </p>
                <Button variant="hologram" onClick={() => navigate("/teacher-create-quiz")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Quiz
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="hologram-card hover:shadow-lg transition-all">
                  <CardHeader>
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
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        variant="hologram"
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
