import { Router } from 'express';
import {
  getContactsByIdController,
  getContactsController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
export default router;

// import { getAllContacts, getContactsById } from '../services/contacts.js';

// const router = Router();

// router.get('/contacts', async (req, res) => {
//   const contacts = await getAllContacts();
//   res.status(200).json({
//     data: contacts,
//   });
// });

// router.get('/contacts/:contactsId', async (req, res, next) => {
//   const { contactsId } = req.params;
//   const contact = await getContactsById(contactsId);

//   if (!contact) {
//     res.status(404).json({
//       message: 'Contact not found',
//     });
//     return;
//   }

//   res.status(200).json({
//     data: contact,
//   });
// });

// export default router;
