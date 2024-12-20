import createHttpError from 'http-errors';
import {
  getContactsById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  if (!contacts) {
    throw createHttpError(404, 'Contacts not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById({
    _id: contactId,
    userId: req.user._id,
  });
  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} was not found`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact({ _id: contactId, userId: req.user._id });

  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} was not found`);
  }
  res.status(204).send();
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(
    { _id: contactId, userId: req.user._id },
    req.body,
  );

  if (!result) {
    throw createHttpError(404, `Contact with id ${contactId} was not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated the contact!`,
    data: result,
  });
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;

  const result = await updateContact(
    { _id: contactId, userId: req.user._id },
    req.body,
    {
      upsert: true,
    },
  );

  if (!result) {
    throw createHttpError(404, `Contact with id ${contactId} was not found`);
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};
