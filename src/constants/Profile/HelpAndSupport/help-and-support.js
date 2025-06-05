import { externalUrls } from '../../urls';

export const help_support_data = [
  {
    title: 'Need Help Now? Chat with Us!',
    // icon: BiSupport,
    description: 'Talk to a real person for instant support.',
    clickable: 'Initiate a chat',
    // onClick: click_chat_fun,
  },
  {
    title: 'Send Us a Message',
    // icon: BiSolidMessageRoundedDetail,
    description: "Questions, feedback, or feature requests? We're here!",
    url: 'mailto:' + externalUrls.zintlrMail,
    clickable: 'Write to us',
  },
];

export const zintlr_doc_data = [
  {
    title: 'LEARN ALL THE MOVES',
    // img: DocumentImage,
    description: 'Guides, tutorials, & answers at your fingertips.',
    // clickable: "Help documents page",
    url: externalUrls.zintlrBlog,
  },
  {
    title: 'SEE IT IN ACTION',
    // img: VideoHelpImage,
    description: 'Watch quick videos to master Zintlr like a pro.',
    // clickable: "Zintlr video page",
    url: externalUrls.zintlrYoutube,
  },
];
