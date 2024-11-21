import createHttpError from 'http-errors';
import {
  getContactsById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  if (!contacts) {
    throw createHttpError(404, 'Contacts not found');
  }
  res.status(200).json({
    status: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 'Successfully found contact with id ${contactId}!',
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact not found`));
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upset: true,
  });

  if (!result) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.contact,
  });
};

// import createHttpError from 'http-errors';

// export const getContactsByIdContriller = async (req, res, next) => {
//   const { contactsId } = req.params;
//   const contacts = await getAllContacts(contactsId);

//   if (!contact) {
//     throw createHttpError(404`Contact not found`);
//   }
//   res.json({
//     status: 200,
//     message: `Succsessfully found contacts`,
//     data: contacts,
//   });
// };

// export const getContactsByIdContriller = async (req, res, next) => {
// try {
//     const contacts = await getAllContacts();
//     res.json({
//       status: 200,
//       message: `Succsessfully found contacts`,
//       data: contacts,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// import { getAllContacts, getContactsById } from '../services/contacts.js';

// export const getContactsController = async (req, res) => {
//   const contacts = await getAllContacts();

//   res.json({
//     stayus: 200,
//     message: 'Seccessfully found contacts!',
//     data: contacts,
//   });
// };

// export const getContactsByIdContriller = async (req, res) => {
//   const { contactsId } = req.params;
//   const contact = await getContactsById(contactsId);

//   if (!contact) {
//     res.status(404).json({
//       message: 'Contact not found',
//     });
//     return;
//   }
//   res.json({
//     status: 200,
//     message: `Succsessfully fond contact with id ${contactsId}`,
//     data: contact,
//   });
// };
