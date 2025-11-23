# 🧪 Testing Guide - Full Database Integration

## Prerequisites

✅ Backend running on http://localhost:5000
✅ Frontend running on http://localhost:8081
✅ MongoDB connected

---

## Test Scenario 1: Teacher Creates Quiz

### Steps:

1. **Open Frontend**
   - Go to http://localhost:8081/

2. **Login as Teacher**
   - Click "Go to Login Page"
   - Switch to "Teacher" tab
   - Enter:
     - Name: `Mr. Smith`
     - Email: `teacher@school.com`
   - Click "Login as Teacher"

3. **Create a Quiz**
   - Click "Create Quiz" button (green button in sidebar)
   - Fill in quiz details:
     - Quiz Title: `General Knowledge Quiz`
     - Difficulty: `Medium`
     - Time Limit: `300` (5 minutes)
   
4. **Add Questions**
   - Question 1:
     - Question: `What is the capital of France?`
     - Options:
       - A: `London`
       - B: `Paris` ✓ (select this as correct)
       - C: `Berlin`
       - D: `Madrid`
   
   - Click "Add Question"
   
   - Question 2:
     - Question: `Which planet is known as the Red Planet?`
     - Options:
       - A: `Venus`
       - B: `Mars` ✓ (select this as correct)
       - C: `Jupiter`
       - D: `Saturn`
   
   - Click "Add Question"
   
   - Question 3:
     - Question: `What is 2 + 2?`
     - Options:
       - A: `3`
       - B: `4` ✓ (select this as correct)
       - C: `5`
       - D: `6`

5. **Save Quiz**
   - Click "Save Quiz" button
   - You should see: "Quiz created successfully!" toast

### Expected Results:

✅ Browser console shows: `✅ Quiz saved to database with ID: [some-id]`
✅ Redirected to Teacher Dashboard
✅ Quiz appears in "My Quizzes" section
✅ Quiz card shows:
   - Title: "General Knowledge Quiz"
   - Difficulty: "Medium"
   - "3 Questions"
   - "5min"

### Verify in MongoDB:

1. Go to https://cloud.mongodb.com/
2. Click on your cluster
3. Click "Browse Collections"
4. Select `quizzes` collection
5. You should see your quiz with all questions

---

## Test Scenario 2: Student Sees Available Quizzes

### Steps:

1. **Logout or Open Incognito Window**
   - If logged in as teacher, click "Logout"
   - Or open a new incognito/private window

2. **Login as Student**
   - Go to http://localhost:8081/
   - Click "Go to Login Page"
   - Switch to "Student" tab
   - Enter:
     - Name: `John Doe`
     - Email: `student@school.com`
     - Roll Number: `S001`
   - Click "Login as Student"

3. **View Dashboard**
   - You should be on the Student Dashboard
   - Scroll down to "Available Quizzes" section

### Expected Results:

✅ Browser console shows: `✅ Loaded X quizzes from database`
✅ Quiz card appears showing:
   - Title: "General Knowledge Quiz"
   - Difficulty badge: "Medium" (yellow)
   - "3 Questions • 5 minutes"
   - "Start Quiz" button

---

## Test Scenario 3: Student Attempts Quiz

### Steps:

1. **Start Quiz**
   - Click "Start Quiz" button on the quiz card
   - Quiz page loads

2. **Verify Quiz Loaded**
   - Check browser console: `✅ Loaded quiz from database: General Knowledge Quiz`
   - Top shows: "Question 1/3"
   - Timer shows: "5:00"
   - Question appears with 4 options

3. **Answer Questions**
   - Question 1: Select "Paris" (option B)
   - Click "Next"
   - Question 2: Select "Mars" (option B)
   - Click "Next"
   - Question 3: Select "4" (option B)

4. **Submit Quiz**
   - Click "Submit Quiz" button
   - Confirm submission

### Expected Results:

✅ Browser console shows: `✅ Quiz results saved to database`
✅ Redirected to Results page
✅ Results page shows:
   - Score: "100%" (if all correct)
   - "3 / 3 Correct"
   - Time taken
   - Pie chart showing correct/wrong answers

### Verify in MongoDB:

1. Go to MongoDB Atlas
2. Browse Collections
3. Select `results` collection
4. You should see the student's result with:
   - quizId (matches the quiz)
   - studentId (matches the student)
   - answers array with 3 items
   - score: 100
   - totalQuestions: 3
   - correctAnswers: 3
   - timeTaken: [seconds]

---

## Test Scenario 4: Multiple Students

### Steps:

1. **Logout and Login as Different Student**
   - Logout
   - Login with:
     - Name: `Jane Smith`
     - Email: `jane@school.com`
     - Roll Number: `S002`

2. **Attempt Same Quiz**
   - Click "Start Quiz" on the same quiz
   - Answer questions (try getting some wrong)
   - Submit quiz

3. **Check Results**
   - View results page
   - Check MongoDB `results` collection

### Expected Results:

✅ New result entry in database
✅ Different studentId
✅ Same quizId
✅ Different score (if answered differently)
✅ Both results stored separately

---

## Test Scenario 5: Teacher Views Quizzes

### Steps:

1. **Login as Teacher**
   - Use the same teacher account: `teacher@school.com`

2. **View Dashboard**
   - Should see all created quizzes
   - Each quiz shows:
     - Title
     - Difficulty
     - Question count
     - Time limit
     - "Conduct Quiz" button
     - Delete button (trash icon)

### Expected Results:

✅ Browser console shows: `✅ Loaded X quizzes from database`
✅ All quizzes created by this teacher appear
✅ Analytics section shows stats

---

## Test Scenario 6: Delete Quiz

### Steps:

1. **As Teacher**
   - On Teacher Dashboard
   - Find a quiz card
   - Click the trash icon (delete button)

2. **Confirm Deletion**
   - Quiz should disappear from dashboard

### Expected Results:

✅ Browser console shows: `✅ Quiz deleted from database`
✅ Toast message: "Quiz deleted successfully"
✅ Quiz removed from dashboard
✅ Quiz no longer appears for students

### Verify in MongoDB:

1. Go to MongoDB Atlas
2. Browse `quizzes` collection
3. Quiz should be deleted (not found)

---

## Common Issues & Solutions

### Issue: "Backend not available"
**Solution:** 
- Check backend is running: `cd realtime-quiz/backend && npm run dev`
- Verify MongoDB connection in backend console

### Issue: "No quizzes available"
**Solution:**
- Make sure you created a quiz as a teacher first
- Check MongoDB `quizzes` collection has data
- Verify student is logged in with valid token

### Issue: "Failed to load quiz"
**Solution:**
- Check browser console for errors
- Verify quiz ID is correct
- Check backend logs for errors

### Issue: "Failed to save results"
**Solution:**
- Check student is logged in
- Verify authToken exists in localStorage
- Check backend logs for validation errors

---

## Verification Checklist

After testing, verify:

- [ ] Teacher can create quizzes
- [ ] Quizzes appear in MongoDB `quizzes` collection
- [ ] Student can see available quizzes
- [ ] Student can load and attempt quiz
- [ ] Quiz questions display correctly
- [ ] Timer works (if timed mode)
- [ ] Student can submit answers
- [ ] Results saved to MongoDB `results` collection
- [ ] Results page displays correctly
- [ ] Multiple students can attempt same quiz
- [ ] Each student's results stored separately
- [ ] Teacher can view all their quizzes
- [ ] Teacher can delete quizzes
- [ ] Deleted quizzes removed from database

---

## Browser Console Logs to Look For

### Successful Flow:

```
✅ User authenticated successfully
✅ Loaded X quizzes from database
✅ Loaded quiz from database: [Quiz Title]
✅ Quiz results saved to database
```

### Error Indicators:

```
⚠️ Backend not available
⚠️ Could not load quizzes from database
❌ Failed to load quiz
❌ Failed to save results
```

---

## MongoDB Collections to Check

### 1. users
- Should have teacher and student accounts
- Check `userType` field

### 2. quizzes
- Should have quizzes created by teachers
- Check `teacherId` matches teacher's `_id`
- Verify `questions` array has all questions

### 3. results
- Should have quiz attempts by students
- Check `quizId` matches quiz `_id`
- Check `studentId` matches student `_id`
- Verify `score` and `answers` are correct

---

## Success Criteria

✅ **End-to-End Flow Works:**
1. Teacher creates quiz → Saved to DB
2. Student sees quiz → Loaded from DB
3. Student attempts quiz → Loaded from DB
4. Student submits → Results saved to DB
5. All data persisted in MongoDB

✅ **No Console Errors**
✅ **All API calls successful (200 status)**
✅ **Data visible in MongoDB Atlas**
✅ **Multiple users can use the system simultaneously**

---

## 🎉 If All Tests Pass

Congratulations! Your QuizMaster application has **full database integration** and is working perfectly!

You can now:
- Create unlimited quizzes
- Have unlimited students
- Track all quiz attempts
- Build analytics and reports
- Scale to production

**Your quiz platform is production-ready!** 🚀
