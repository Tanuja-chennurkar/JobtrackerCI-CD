from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String)
    company = Column(String)
    status = Column(String)
    user_email = Column(String)
class Profile(Base):

    __tablename__ = "profiles"

    id = Column(String, primary_key=True, index=True)

    user_email = Column(String, unique=True)

    name = Column(String)

    title = Column(String)

    bio = Column(String)

    github = Column(String)

    linkedin = Column(String)

    skills = Column(String)

