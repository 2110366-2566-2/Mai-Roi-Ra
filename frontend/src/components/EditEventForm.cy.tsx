import React from 'react';
import EditEventForm from './EditEventForm';

describe('<EditEventForm />', () => {
  it('renders', () => {
    const props = {
      Id: '123',
      Name: 'Event Name',
      Activity: 'Some activity',
      StartDate: '2024-04-18',
      EndDate: '2024-04-19',
      Price: 10,
      Location: 'Some location',
      District: 'Some district',
      Province: 'Some province',
      Description: 'Event description',
      ImgSrc: 'image-source.jpg',
      Status: 'active'
    };

    cy.mount(<EditEventForm {...props} />);
  });
});
