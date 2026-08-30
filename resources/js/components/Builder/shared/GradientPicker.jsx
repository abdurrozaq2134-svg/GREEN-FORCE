import React from \"react\";

const GradientPicker = ({ value, onChange }) => {
  const { color1 = \"#7F77DD\", color2 = \"#D4537E\", angle = 135 } = value || {};

  const update = (newPartial) => {
    onChange({ ...value, type: \"gradient\", color1, color2, angle, ...newPartial });
  };

  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  return (
    <div style={{ padding: \"10px\", border: \"1px solid #ccc\", borderRadius: \"4px\" }}>
      <div style={{ height: \"50px\", background: gradient, marginBottom: \"10px\", borderRadius: \"4px\" }} />
      <div style={{ display: \"flex\", gap: \"5px\", marginBottom: \"10px\" }}>
        <input type=\"color\" value={color1} onChange={(e) => update({ color1: e.target.value })} />
        <input type=\"color\" value={color2} onChange={(e) => update({ color2: e.target.value })} />
      </div>
      <label>Sudut: {angle}°</label>
      <input 
        type=\"range\" min=\"0\" max=\"360\" value={angle} 
        onChange={(e) => update({ angle: Number(e.target.value) })} 
        style={{ width: \"100%\" }}
      />
    </div>
  );
};

export default GradientPicker;
