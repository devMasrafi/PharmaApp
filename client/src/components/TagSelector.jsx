import React, { useState } from "react";

const TagSelector = () => {
  const [tags, setTags] = useState([
    "a",
    "b",
    "c",
    "apple",
    "banana",
    "cherry",
  ]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    if (value) {
      setFilteredTags(tags.filter((tag) => tag.toLowerCase().includes(value)));
    } else {
      setFilteredTags([]);
    }
  };

  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setInputValue(""); // Clear input field
    setFilteredTags([]); // Clear filtered list
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {tag}
            <span
              style={{
                marginLeft: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => removeTag(tag)}
            >
              ×
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search tags..."
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        />
        {filteredTags.length > 0 && (
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              background: "#fff",
            }}
          >
            {filteredTags.map((tag, index) => (
              <div
                key={index}
                onClick={() => handleTagClick(tag)}
                style={{
                  padding: "5px",
                  cursor: "pointer",
                  borderBottom:
                    index !== filteredTags.length - 1
                      ? "1px solid #ddd"
                      : "none",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
