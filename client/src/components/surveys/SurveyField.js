//SurveyField contains logid to render a single label
//and text input
import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
	return (
			<div>
				<label>{label}</label>
				<input {...input} />
			</div>
		   );
};

export default SurveyField;
