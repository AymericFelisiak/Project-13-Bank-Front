import React from 'react';

/**
 * Component used in the home page (You are our #1 priority etc..)
 * Components args name are self explanatory
 */

export default function FeatureItem({ icon, iconAlt, title, description }) {
    return (
        <div className="feature-item">
            <img src={icon} alt={iconAlt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
}
