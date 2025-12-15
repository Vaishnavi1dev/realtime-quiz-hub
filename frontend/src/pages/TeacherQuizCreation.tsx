import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/config/api";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

const TeacherQuizCreation = () => {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [timeLimit, setTimeLimit] = useState("300");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", question: "", options: ["", "", "", ""], correct: 0 },
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correct: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const saveQuiz = async () => {
    if (!quizTitle.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }

    const emptyQuestions = questions.filter((q) => !q.question.trim());
    if (emptyQuestions.length > 0) {
      toast.error("Please fill in all questions");
      return;
    }

    const emptyOptions = questions.some((q) => q.options.some((opt) => !opt.trim()));
    if (emptyOptions) {
      toast.error("Please fill in all answer options");
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        toast.error("Please login again");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': authToken,
        },
        body: JSON.stringify({
          title: quizTitle,
          difficulty,
          timeLimit: parseInt(timeLimit),
          questions: questions.map((q) => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correct,
            points: 10
          })),
        }),
      });
      
      if (response.ok) {
        const savedQuiz = await response.json();
        console.log('✅ Quiz saved to database with ID:', savedQuiz._id);
        
        // Also save to localStorage for offline access
        const quiz = {
          id: savedQuiz._id,
          title: quizTitle,
          difficulty,
          timeLimit: parseInt(timeLimit),
          questions: questions.map((q, idx) => ({ ...q, id: idx + 1 })),
          createdAt: new Date().toISOString(),
        };
        
        const existingQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
        localStorage.setItem("teacherQuizzes", JSON.stringify([...existingQuizzes, quiz]));
        
        toast.success("Quiz created successfully!");
        navigate("/teacher-dashboard");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create quiz");
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <Button variant="outline" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="mb-6 border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Quiz</CardTitle>
            <CardDescription>Design your quiz with custom questions and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input
                  id="quiz-title"
                  placeholder="e.g., General Knowledge Quiz"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-limit">Time Limit (seconds)</Label>
                <Input
                  id="time-limit"
                  type="number"
                  placeholder="300"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-6">
          {questions.map((question, qIndex) => (
            <Card key={question.id} className="border-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
                {questions.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                  <Textarea
                    id={`question-${question.id}`}
                    placeholder="Enter your question here"
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Answer Options</Label>
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correct === optIndex}
                        onChange={() => updateQuestion(question.id, "correct", optIndex)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="font-semibold text-sm w-6">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>
                      <Input
                        placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                        value={option}
                        onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                      />
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground">
                    Select the radio button for the correct answer
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button onClick={addQuestion} variant="outline" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
          <Button onClick={saveQuiz} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherQuizCreation;
