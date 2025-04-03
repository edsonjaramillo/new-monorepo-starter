#!/bin/bash

# --- Configuration ---
SEARCH_DEPTH=4
# Use first argument as root dir, or default to current directory '.'
ROOT_DIR="${1:-.}"

# --- Dependency Checks ---
# Check if jq is installed
if ! command -v jq &>/dev/null; then
  echo "Error: 'jq' command not found. Please install jq." >&2
  echo "e.g., sudo apt install jq / sudo yum install jq / brew install jq" >&2
  exit 1
fi

# Check if fzf is installed
if ! command -v fzf &>/dev/null; then
  echo "Error: 'fzf' command not found. Please install fzf." >&2
  echo "e.g., sudo apt install fzf / sudo yum install fzf / brew install fzf" >&2
  exit 1
fi

# Check if the target directory exists
if [ ! -d "$ROOT_DIR" ]; then
  echo "Error: Directory '$ROOT_DIR' not found." >&2
  exit 1
fi

# --- Main Logic ---
echo "Searching for package.json files in '$ROOT_DIR' (depth <= $SEARCH_DEPTH)..." >&2

# Find package.json files up to the specified depth
# Use -print0 and read -d '' for safe handling of filenames with spaces/special chars
# Use jq to extract keys from .dependencies and .devDependencies
# Handle cases where these sections might be null or missing using // {}
# Sort the combined list and make it unique
# Store the unique sorted list in a variable
all_deps=$(find "$ROOT_DIR" -maxdepth "$SEARCH_DEPTH" -name 'package.json' -type f -print0 |
  while IFS= read -r -d $'\0' file; do
    # Use jq's alternative operator // to provide an empty object if the key is null/missing
    # -r outputs raw strings (no quotes)
    jq -r '(.dependencies // {}), (.devDependencies // {}) | keys_unsorted[]' "$file" 2>/dev/null ||
      echo "Warning: Could not process JSON in '$file'. Skipping." >&2
  done | sort -u)

# Check if any dependencies were found
if [ -z "$all_deps" ]; then
  echo "No dependencies found in package.json files within the specified directory and depth." >&2
  exit 0
fi

echo "Found dependencies. Use fzf to select (TAB or Shift+TAB to multi-select, Enter to confirm):" >&2

# Use fzf for interactive selection
# --multi allows selecting multiple items (use TAB or Shift+TAB)
# --height limits fzf window height (optional)
# --prompt sets the prompt string
selected_deps=$(echo "$all_deps" | fzf --multi --height=40% --prompt="Select Deps > " --border --info=inline --header="Press TAB to multi-select" --reverse)

# --- Output Results ---
# Check if the user made a selection (fzf returns non-empty string)
if [ -n "$selected_deps" ]; then
  for dep in $selected_deps; do
    pnpm exec manypkg upgrade "$dep"
  done
else
  echo "No dependencies selected." >&2
fi

exit 0
