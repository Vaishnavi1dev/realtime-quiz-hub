# ⚡ Quick Test - 5 Minutes

## Prerequisites
✅ Backend running on http://localhost:5000
✅ Frontend running on http://localhost:8081

---

## 🎯 Quick Test (5 minutes)

### Step 1: Create Quiz as Teacher (2 min)

1. Open http://localhost:8081/
2. Click "Go to Login Page"
3. Switch to **Teacher** tab
4. Enter:
   - Name: `Teacher`
   - Email: `teacher@test.com`
5. Click "Login as Teacher"
6. Click **"Create Quiz"** button
7. Fill in:
   - Title: `Quick Test Quiz`
   - Difficulty: `Medium`
   - Time: `300`
8. Add one question:
   - Question: `What is 2+2?`
   - Options: `3`, `4`, `5`, `6`
   - Select `4` as correct
9. Click **"Save Quiz"**

**✅ Expected:** Toast "Quiz created successfully!" and redirected to dashboard

---

### Step 2: Attempt Quiz as Student (2 min)

1. **Logout** (click Logout button)
2. Click "Go to Login Page"
3. Switch to **Student** tab
4. Enter:
   - Name: `Student`
   - Email: `student@test.com`
   - Roll: `S001`
5. Click "Login as Student"
6. **See the quiz card** "Quick Test Quiz"
7. Click **"Start Quiz"**
8. Select answer `4`
9. Click **"Submit Quiz"**

**✅ Expected:** Results page showing 100% score

---

### Step 3: Verify in MongoDB (1 min)

1. Go to https://cloud.mongodb.com/
2. Click your cluster
3. Click "Browse Collections"
4. Check:
   - `quizzes` → Should have "Quick Test Quiz"
   - `results` → Should have student's result

**✅ Expected:** Data visible in both collections

---

## 🎉 Success!

If all steps worked, your database integration is **100% functional**!

### What You Just Tested:
✅ Teacher creates quiz → Saved to MongoDB
✅ Student sees quiz → Loaded from MongoDB
✅ Student attempts quiz → Loaded from MongoDB
✅ Results submitted → Saved to MongoDB

---

## 🐛 If Something Failed

### Quiz not appearing for student?
- Check browser console for errors
- Verify backend is running
- Check MongoDB connection

### Can't submit quiz?
- Check you're logged in as student
- Verify authToken in localStorage
- Check backend logs

### Need help?
- Check `TESTING_GUIDE.md` for detailed steps
- Check `FULL_DATABASE_INTEGRATION.md` for complete docs
- Check browser console and backend logs

---

## 📊 Console Logs to Look For

### Success Indicators:
```
✅ User authenticated successfully
✅ Quiz saved to database with ID: ...
✅ Loaded 1 quizzes from database
✅ Loaded quiz from database: Quick Test Quiz
✅ Quiz results saved to database
```

### If You See These:
```
⚠️ Backend not available
⚠️ Could not load quizzes
```
→ Check backend is running on port 5000

---

## 🚀 You're Done!

Your QuizMaster app is fully integrated with MongoDB and working perfectly!

**Time to celebrate!** 🎊
