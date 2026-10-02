"""Make display name optional after switching account login to email.

Revision ID: cd23ef45ab67
Revises: ab12cd34ef56
"""

from alembic import op
import sqlalchemy as sa


revision = "cd23ef45ab67"
down_revision = "ab12cd34ef56"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column("users", "full_name", existing_type=sa.String(length=200), nullable=True)
    for constraint in sa.inspect(op.get_bind()).get_unique_constraints("users"):
        if constraint.get("column_names") == ["full_name"] and constraint.get("name"):
            op.drop_constraint(constraint["name"], "users", type_="unique")


def downgrade() -> None:
    op.execute("UPDATE users SET full_name = COALESCE(full_name, email, 'user-' || id::text) WHERE full_name IS NULL")
    op.create_unique_constraint("uq_users_full_name", "users", ["full_name"])
    op.alter_column("users", "full_name", existing_type=sa.String(length=200), nullable=False)
