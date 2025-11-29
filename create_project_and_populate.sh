#!/usr/bin/env bash
set -euo pipefail

# Populate existing project board with issues by label
# Requires gh CLI and a PAT with 'repo' and 'project' scopes

OWNER=${1:-paulmmoore3416}
PROJECT_ID=${2:-5}

echo "Populating project board ${PROJECT_ID} for user ${OWNER}"

# Get project info
PROJECT_JSON=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" /users/${OWNER}/projects/${PROJECT_ID})
PROJECT_NAME=$(echo "$PROJECT_JSON" | jq -r .name)
echo "Project: $PROJECT_NAME"

# List existing columns
COLUMNS_JSON=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" /projects/${PROJECT_ID}/columns)
echo "Existing columns:"
echo "$COLUMNS_JSON" | jq -r '.[] | "\(.id): \(.name)"'

# Define desired columns
DESIRED_COLUMNS=("To Do" "In Progress" "Done")

# Create missing columns
declare -A COLUMN_IDS
while IFS= read -r line; do
  ID=$(echo "$line" | cut -d: -f1)
  NAME=$(echo "$line" | cut -d: -f2- | sed 's/^ *//')
  COLUMN_IDS["$NAME"]=$ID
done < <(echo "$COLUMNS_JSON" | jq -r '.[] | "\(.id): \(.name)"')

for COL_NAME in "${DESIRED_COLUMNS[@]}"; do
  if [[ -z "${COLUMN_IDS[$COL_NAME]:-}" ]]; then
    echo "Creating column: $COL_NAME"
    COL_JSON=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" /projects/${PROJECT_ID}/columns -f name="$COL_NAME")
    COL_ID=$(echo "$COL_JSON" | jq -r .id)
    COLUMN_IDS["$COL_NAME"]=$COL_ID
  else
    echo "Column $COL_NAME already exists with ID ${COLUMN_IDS[$COL_NAME]}"
  fi
done

# Function to add issues to column
add_issues_to_column() {
  LABEL="$1"; COL_ID="$2"
  echo "Adding issues labeled '$LABEL' to column $COL_ID"
  # Assuming issues from the Pokemon-Go-Stats repo
  REPO="Pokemon-Go-Stats"
  gh api --paginate /repos/${OWNER}/${REPO}/issues --jq ".[] | select(.labels[]? | .name==\"${LABEL}\") | .number" | while read -r num; do
    ISSUE_DB_ID=$(gh api /repos/${OWNER}/${REPO}/issues/${num} --jq '.id')
    echo " - adding issue #${num}"
    gh api -H "Accept: application/vnd.github.inertia-preview+json" /projects/columns/${COL_ID}/cards -f content_id="${ISSUE_DB_ID}" -f content_type="Issue" || echo "   -> maybe already present"
    sleep 0.15
  done
}

# Add issues by label to columns
add_issues_to_column "To Do" "${COLUMN_IDS["To Do"]}"
add_issues_to_column "In Progress" "${COLUMN_IDS["In Progress"]}"
add_issues_to_column "Done" "${COLUMN_IDS["Done"]}"

# Enrich About text
ABOUT_TEXT="This project board tracks issues for the Pokemon Go Stats repository. Automatically populated with issues labeled To Do, In Progress, and Done."
gh api -X PATCH -H "Accept: application/vnd.github.inertia-preview+json" /projects/${PROJECT_ID} -f body="$ABOUT_TEXT"

echo "All done — open the project in the browser: https://github.com/users/${OWNER}/projects/${PROJECT_ID}"