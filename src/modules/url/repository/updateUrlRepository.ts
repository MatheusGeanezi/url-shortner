import UrlModel, { IUrlAttributes } from '../models/url'

export const updateRepository = async (
  filter: any,
  updateData: any
): Promise<void> => {
  await UrlModel.update(updateData, { where: filter })
}
