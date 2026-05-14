from pydantic import BaseModel

class JobCreate(BaseModel):
    title: str
    company: str

class JobUpdate(BaseModel):
    status: str
class ProfileUpdate(BaseModel):

    name: str

    title: str

    bio: str

    github: str

    linkedin: str

    skills: str


    