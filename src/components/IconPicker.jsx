// import React, { useState } from "react";
// import { Dropdown, Card } from "react-bootstrap";
// import { FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";

// const IconPicker = () => {
//     const icons = [<FaYoutube />, <FaTwitter />, <FaFacebook />];
//     const [selectedIcon, setSelectedIcon] = useState(null);
//     const handleIconChange = (icon) => {
//       setSelectedIcon(icon);
//       onSelectIcon(icon); // Call the onSelectIcon prop with the selected icon
//     };
//     };

//   return (
//     <div>
//       <Dropdown onSelect={(eventKey) => handleIconChange(icons[eventKey])}>
//         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//           {selectedIcon ? selectedIcon : "Select an icon"}
//         </Dropdown.Toggle>
//         <Dropdown.Menu>
//           {icons.map((icon, index) => (
//             <Dropdown.Item key={index} eventKey={index}>
//               {icon}
//             </Dropdown.Item>
//           ))}
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// };

// export default IconPicker;
