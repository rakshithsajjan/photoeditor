#!/usr/bin/env python3
import os
import argparse
import mimetypes
from pathlib import Path
import textwrap

# File types to consider as text
TEXT_EXTENSIONS = {
    '.txt', '.md', '.py', '.js', '.jsx', '.ts', '.tsx', '.html', '.css', 
    '.json', '.yaml', '.yml', '.toml', '.xml', '.csv', '.sh', '.bat',
    '.java', '.c', '.cpp', '.h', '.hpp', '.cs', '.go', '.rs', '.rb',
    '.php', '.swift', '.kt', '.dart', '.vue', '.scss', '.less', '.sql'
}

def is_text_file(file_path):
    """Determine if a file is likely a text file based on extension or mimetype."""
    ext = os.path.splitext(file_path)[1].lower()
    if ext in TEXT_EXTENSIONS:
        return True
    
    mime_type, _ = mimetypes.guess_type(file_path)
    return mime_type and mime_type.startswith('text/')

def get_file_content(file_path, max_size_mb=1):
    """Extract text content from a file if it's a text file and not too large."""
    if not os.path.exists(file_path):
        return f"Error: File not found - {file_path}"
    
    # Check file size
    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
    if file_size_mb > max_size_mb:
        return f"File too large ({file_size_mb:.2f} MB) - skipped"
    
    if not is_text_file(file_path):
        return "Binary file - content not extracted"
    
    try:
        with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {str(e)}"

def print_directory_tree(directory, output_file, extract_text=True, indent="", is_last=True, max_depth=None, current_depth=0):
    """Recursively print directory structure as a tree and extract text from files."""
    directory_path = Path(directory)
    directory_name = directory_path.name
    
    # Print directory name
    branch = "└── " if is_last else "├── "
    output_file.write(f"{indent}{branch}{directory_name}/\n")
    
    # Prepare indent for nested items
    indent_extension = "    " if is_last else "│   "
    new_indent = indent + indent_extension
    
    # Check max depth
    if max_depth is not None and current_depth >= max_depth:
        output_file.write(f"{new_indent}...\n")
        return
    
    # Get contents and sort (directories first, then files)
    contents = list(directory_path.iterdir())
    dirs = sorted([d for d in contents if d.is_dir()])
    files = sorted([f for f in contents if f.is_file()])
    
    # Process directories
    for i, dir_path in enumerate(dirs):
        print_directory_tree(
            dir_path, 
            output_file, 
            extract_text=extract_text,
            indent=new_indent, 
            is_last=(i == len(dirs) - 1 and len(files) == 0),
            max_depth=max_depth,
            current_depth=current_depth + 1
        )
    
    # Process files
    for i, file_path in enumerate(files):
        is_last_file = (i == len(files) - 1)
        branch = "└── " if is_last_file else "├── "
        
        output_file.write(f"{new_indent}{branch}{file_path.name}\n")
        
        if extract_text:
            # Extract and format file content
            content = get_file_content(file_path)
            if content and not content.startswith("Error") and not content.startswith("File too large") and not content.startswith("Binary file"):
                # Format content for LLM consumption
                formatted_content = format_content_for_llm(file_path, content)
                indent_content = new_indent + ("    " if is_last_file else "│   ")
                wrapped_content = textwrap.indent(formatted_content, indent_content)
                output_file.write(f"{wrapped_content}\n")

def format_content_for_llm(file_path, content):
    """Format file content to be LLM-friendly."""
    extension = os.path.splitext(file_path)[1][1:]  # Remove the dot
    if not extension:
        extension = "txt"
    
    # Truncate very long files to prevent overwhelming the output
    max_lines = 300
    content_lines = content.splitlines()
    if len(content_lines) > max_lines:
        half = max_lines // 2
        first_half = content_lines[:half]
        last_half = content_lines[-half:]
        content_lines = first_half + [f"\n... (skipped {len(content_lines) - max_lines} lines) ...\n"] + last_half
        content = "\n".join(content_lines)
    
    # Format the content with code fences for code files
    formatted = f"```{extension}\n{content}\n```\n"
    return formatted

def main():
    parser = argparse.ArgumentParser(description="Extract text from files in a directory and display as a tree.")
    parser.add_argument("directory", help="Directory to extract text from")
    parser.add_argument("-o", "--output", default="extracted_text.md", help="Output file (default: extracted_text.md)")
    parser.add_argument("--no-extract", action="store_true", help="Don't extract file contents (tree structure only)")
    parser.add_argument("--max-depth", type=int, help="Maximum depth to traverse")
    args = parser.parse_args()
    
    directory = args.directory
    if not os.path.isdir(directory):
        print(f"Error: {directory} is not a valid directory")
        return
    
    with open(args.output, 'w', encoding='utf-8') as output_file:
        output_file.write(f"# Directory Tree and File Contents: {os.path.basename(directory)}\n\n")
        output_file.write("## Directory Structure\n\n")
        print_directory_tree(
            directory, 
            output_file, 
            extract_text=not args.no_extract,
            max_depth=args.max_depth
        )
        
        if not args.no_extract:
            output_file.write("\n## Extracted File Contents\n\n")
            # We already extracted the content while building the tree
    
    print(f"Extraction complete. Results saved to {args.output}")

if __name__ == "__main__":
    main() 