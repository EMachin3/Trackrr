# Trackrr
A website that allows users to track all the media that they have either already consumed or plan to consume across media formats.    
## Setup
1. git clone https://github.com/EMachin3/Trackrr.git
2. Set up a Postgres database on your local machine (you could also edit the code in app.py to access a remote database)
3. Set the DB\_USERNAME, DB\_PASSWORD, and DB\_NAME environment variables.
4. While you're at it, set FLASK\_SECRET\_KEY to be something random (I use os.urandom(24) from the Python library). Also, set the TEST\_USER\_PASSWORD to be the bcrypt hash for your password generated using passlib.
5. cd backend
6. python -m venv .venv
7. . .venv/bin/activate (if on Mac or Linux) or .venv\Scripts\activate (if on Windows)
8. pip install -r requirements.txt
9. python init\_db.py
10. cd ../frontend
11. Install npm
12. npm install
13. Add needed images to public (not uploading them to repo because unsure about copyright)
# Running
Backend: flask run or flask run --debug    
Frontend: npm start or DANGEROUSLY\_DISABLE\_HOST\_CHECK=true npm start
# Access the site
Visit localhost:3000 and sign in with a username of test and your password.
