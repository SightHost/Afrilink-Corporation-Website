// "Coming soon" cards shown on the Events page whenever there are no real
// upcoming events (including while the events database is not yet connected).
// They have no dates or tickets; edit titles/summaries here as plans firm up.
import { withBase } from '../lib/paths';

export const upcomingPlaceholders = [
  {
    slug: 'coming-soon-diaspora-investment-summit',
    title: 'Diaspora Investment Summit',
    summary: 'Briefings and networking for diaspora and institutional investors on structured opportunities across South Africa and the SADC region.',
    cover_image_url: withBase('/un-headquarters.webp'),
  },
  {
    slug: 'coming-soon-mining-resources-forum',
    title: 'Mining & Resources Forum',
    summary: 'A forum on mineral tenure, exploration and offtake partnerships in Botswana and South Africa.',
    cover_image_url: withBase('/afrilink-mg-botswana.webp'),
  },
  {
    slug: 'coming-soon-skills-community-showcase',
    title: 'Skills & Community Showcase',
    summary: 'Celebrating youth upskilling, co-operatives and community development initiatives across our footprint.',
    cover_image_url: withBase('/motokolo-cooperative.webp'),
  },
].map((e) => ({ ...e, placeholder: true, ticket_types: [], event_media: [] }));
