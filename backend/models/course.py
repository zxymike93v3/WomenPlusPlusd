from datetime import datetime
from .base_model import db

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    description = db.Column(db.String(200))
    start_at = db.Column(db.DateTime())
    finish_at = db.Column(db.DateTime())
    number_of_credits = db.Column(db.Integer)

    def __init__(self, name, start_at, finish_at, description="", number_of_credits=0):
        # we dont have to create the id because the db will do that automatically
        self.name = name
        self.start_at = start_at
        self.finish_at = finish_at
        self.description = description
        self.number_of_credits = number_of_credits

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'start_at': self.start_at,
            'finish_at': self.finish_at,
            'number_of_credits': self.number_of_credits
        }

    def update(self, json_with_updates):
        '''
        Updates course info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        description = json_with_updates.get('description')
        if description is not None and description != self.description:
                self.description = description
                has_updates = True
        start_at = json_with_updates.get('start_at')
        if start_at is not None and start_at != self.start_at:
            self.start_at = start_at
            has_updates = True
        finish_at = json_with_updates.get('finish_at')
        if finish_at is not None and finish_at != self.finish_at:
            self.finish_at = finish_at
            has_updates = True
        number_of_credits = json_with_updates.get('number_of_credits')
        if number_of_credits is not None and number_of_credits != self.number_of_credits:
            self.number_of_credits = number_of_credits
            has_updates = True
        return has_updates
