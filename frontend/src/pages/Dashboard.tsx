import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Trophy, LogOut, Zap, Brain, Users as UsersIcon } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.userType === "teacher") {
        navigate("/teacher-dashboard");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const startQuiz = async (difficulty: string, mode: string) => {
    localStorage.setItem("quizSettings", JSON.stringify({ difficulty, mode }));
    
    // Try to load quizzes from database
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const response = await fetch('http://localhost:5000/api/quiz', {
          headers: {
            'x-auth-token': authToken,
          },
        });
        
        if (response.ok) {
          const quizzes = await response.json();
          console.log('✅ Loaded quizzes from database:', quizzes.length);
          // Store available quizzes for quiz page to use
          localStorage.setItem('availableQuizzes', JSON.stringify(quizzes));
        }
      }
    } catch (error) {
      console.log('⚠️ Using local quiz data');
    }
    
    navigate("/quiz");
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Left Sidebar */}
      <aside className="w-80 border-r backdrop-blur-sm p-6 space-y-6">
        {/* Profile Card */}
        <Card className="hologram-card animate-slide-in-left">
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto border-2 border-primary mb-3">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription className="text-sm">{user.email}</CardDescription>
            <div className="flex gap-2 mt-3 justify-center">
              <Badge variant="default">Student</Badge>
              {user.rollNo && <Badge variant="outline">Roll: {user.rollNo}</Badge>}
            </div>
          </CardHeader>
        </Card>

        {/* Leaderboard Card */}
        <Card 
          className="hologram-card cursor-pointer hover:shadow-lg transition-all" 
          onClick={() => navigate("/leaderboard")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="w-5 h-5" />
              Leaderboard
            </CardTitle>
            <CardDescription className="text-sm">
              View rankings
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Logout Button */}
        <Button variant="outline" onClick={handleLogout} className="w-full">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Difficulty Level Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
            <Target className="w-8 h-8" style={{ color: '#ffffff' }} />
            Choose Difficulty Level
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hologram-card hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-400 group">
              <CardHeader>
                <Brain className="w-10 h-10 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Easy</CardTitle>
                <CardDescription>Perfect for beginners</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hologram-card hover:shadow-lg transition-all cursor-pointer border-2 hover:border-yellow-400 group">
              <CardHeader>
                <Zap className="w-10 h-10 text-yellow-500 mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Medium</CardTitle>
                <CardDescription>Moderate challenge</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hologram-card hover:shadow-lg transition-all cursor-pointer border-2 hover:border-red-400 group">
              <CardHeader>
                <Trophy className="w-10 h-10 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Hard</CardTitle>
                <CardDescription>Expert level</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Quiz Mode Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
            <Zap className="w-8 h-8" style={{ color: '#ffffff' }} />
            Start Quiz
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              className="hologram-card hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => startQuiz("medium", "timed")}
            >
              <CardHeader>
                <Clock className="w-12 h-12 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Timed Quiz</CardTitle>
                <CardDescription>Race against the clock!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="hologram">
                  Start Timed Quiz
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="hologram-card hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => startQuiz("medium", "practice")}
            >
              <CardHeader>
                <Brain className="w-12 h-12 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Practice Mode</CardTitle>
                <CardDescription>Learn at your own pace</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="hologram">
                  Start Practice
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="hologram-card hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => startQuiz("medium", "competition")}
            >
              <CardHeader>
                <Trophy className="w-12 h-12 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Competition</CardTitle>
                <CardDescription>Compete with others!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="hologram">
                  Join Competition
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
