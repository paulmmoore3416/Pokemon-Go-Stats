#!/usr/bin/env bash
set -euo pipefail

# Create a classic project board and 3 columns and add issues by label
# Requires gh CLI and a PAT with 'repo' and 'project' scopes available via gh auth

OWNER=${1:-paulmmoore3416}
REPO=${2:-Pokemon-Go-Stats}
NAME=${3:-"12-12-12 Project Board"}

echo "Creating project board ${NAME} in ${OWNER}/${REPO}"
PROJECT_JSON=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" \
  /repos/${OWNER}/${REPO}/projects -f name="${NAME}" -f body="Auto-created board: To Do / In Progress / Done")
PROJECT_ID=$(echo "$PROJECT_JSON" | jq -r .id)
echo "PROJECT_ID=$PROJECT_ID"

echo "Creating columns..."
TODO_COL=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" "/projects/${PROJECT_ID}/columns" -f name="To Do" | jq -r .id)
INPROG_COL=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" "/projects/${PROJECT_ID}/columns" -f name="In Progress" | jq -r .id)
DONE_COL=$(gh api -H "Accept: application/vnd.github.inertia-preview+json" "/projects/${PROJECT_ID}/columns" -f name="Done" | jq -r .id)

echo "Columns created: TODO=${TODO_COL} INPROG=${INPROG_COL} DONE=${DONE_COL}"

add_issues_to_column() {
  LABEL="$1"; COL_ID="$2"
  echo "Adding issues labeled '$LABEL' to column $COL_ID"
  gh api --paginate /repos/${OWNER}/${REPO}/issues --jq ".[] | select(.labels[]? | .name==\"${LABEL}\") | .number" | while read -r num; do
    ISSUE_DB_ID=$(gh api /repos/${OWNER}/${REPO}/issues/${num} --jq '.id')
    echo " - adding issue #${num}"
    gh api -H "Accept: application/vnd.github.inertia-preview+json" /projects/columns/${COL_ID}/cards -f content_id="${ISSUE_DB_ID}" -f content_type="Issue" || echo "   -> maybe already present"
    sleep 0.15
  done
}

add_issues_to_column "To Do" "$TODO_COL"
add_issues_to_column "In Progress" "$INPROG_COL"
add_issues_to_column "Done" "$DONE_COL"

echo "All done — open the project in the browser: https://github.com/${OWNER}/${REPO}/projects/${PROJECT_ID}"
