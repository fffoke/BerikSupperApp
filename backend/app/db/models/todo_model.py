from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship


from db.base import Base, IdMixin, TimestampMixin
from db.models.user_model import User




class Todo(Base, IdMixin, TimestampMixin):
    __tablename__ = 'todos'

    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String(255))
    priority: Mapped[str] = mapped_column(String(50))

    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id', ondelete='CASCADE') ,nullable=False, index=True
    )
    user: Mapped["User"] = relationship(
        back_populates='todos'
    )

