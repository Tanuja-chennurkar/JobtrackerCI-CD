from fastapi import FastAPI, Depends, Header
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from schemas import JobCreate, JobUpdate, ProfileUpdate
from sqlalchemy import func
from models import Base, Job, Profile
from jose import jwt
from fastapi import FastAPI, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SECRET = "mysecretkeymysecretkeymysecretkey"

Base.metadata.create_all(bind=engine)


# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Extract current user from JWT
def get_current_user(authorization: str = Header(...)):
    token = authorization.split(" ")[1]

    payload = jwt.decode(
        token,
        SECRET,
        algorithms=["HS256"]
    )

    return payload["sub"]


@app.post("/jobs")
def create_job(
    job_data: JobCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    try:

        job = Job(
            title=job_data.title,
            company=job_data.company,
            status="Applied",
            user_email=user
        )

        db.add(job)
        db.commit()

        return {"message": "Job created"}

    except Exception as e:

        print(e)

        return {"error": str(e)}

# Get current user's jobs
@app.get("/jobs")
def get_jobs(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    jobs = db.query(Job).filter(
        Job.user_email == user
    ).all()

    return jobs

@app.put("/jobs/{job_id}")
def update_job_status(
    job_id: str,
    job_update: JobUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    job = db.query(Job).filter(
        Job.id == job_id,
        Job.user_email == user
    ).first()

    if not job:
        return {"error": "Job not found"}

    job.status = job_update.status

    db.commit()

    return {
        "message": "Job updated",
        "new_status": job.status
    }
    
@app.delete("/jobs/{job_id}")
def delete_job(
    job_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    job = db.query(Job).filter(
        Job.id == job_id,
        Job.user_email == user
    ).first()

    if not job:
        return {"error": "Job not found"}

    db.delete(job)
    db.commit()

    return {"message": "Job deleted"}

@app.get("/jobs/stats")
def get_job_stats(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    results = db.query(
        Job.status,
        func.count(Job.id)
    ).filter(
        Job.user_email == user
    ).group_by(
        Job.status
    ).all()

    stats = {
        "Applied": 0,
        "Interview": 0,
        "Offer": 0,
        "Rejected": 0
    }

    for status, count in results:
        stats[status] = count

    return stats
@app.get("/profile")
def get_profile(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    profile = db.query(Profile).filter(
        Profile.user_email == user
    ).first()

    if not profile:

        profile = Profile(
            id=str(uuid.uuid4()),
            user_email=user,
            name="",
            title="",
            bio="",
            github="",
            linkedin="",
            skills=""
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

    return profile


@app.put("/profile")
def update_profile(
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    profile = db.query(Profile).filter(
        Profile.user_email == user
    ).first()

    if not profile:
        return {"error": "Profile not found"}

    profile.name = profile_data.name
    profile.title = profile_data.title
    profile.bio = profile_data.bio
    profile.github = profile_data.github
    profile.linkedin = profile_data.linkedin
    profile.skills = profile_data.skills

    db.commit()

    return {"message": "Profile updated"}