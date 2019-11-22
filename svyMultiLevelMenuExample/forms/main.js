/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"33C2865D-9CDF-4253-ABD7-334B68E2F386"}
 */
function onLoad(event) {
	var OM6 = {
		itemId: 'OrderF',
		text: 'Order F',
		enabled: false
	}

	var OM5 = {
		itemId: 'OrderE',
		text: 'Order E',
		enabled: true,
		menuItems: [OM6]
	}

	var OM4 = {
		itemId: 'OrderD',
		text: 'Order D',
		enabled: true,
		menuItems: [OM5]
	}

	var OM3 = {
		itemId: 'OrderC',
		text: 'Order C',
		enabled: true,
		menuItems: [OM4, OM4]
	}

	var OM2 = {
		itemId: 'OrderB',
		text: 'Order B',
		enabled: true,
		menuItems: [OM3, OM3, OM3]

	}

	var OM1 = {
		itemId: 'Orders SUB 1',
		text: 'SUB 1',
		enabled: true,
		menuItems: [OM2]
	}

	/** @type {CustomType<multilevelmenu-multilevelmenu.MenuItem>} */
	var OM = {
		itemId: 'orders',
		text: 'Orders',
		enabled: true,
		menuItems: [OM1, OM2, OM2, OM1, OM2]
	}

	/** @type {CustomType<multilevelmenu-multilevelmenu.MenuItem>} */
	var CM = {
		itemId: 'customers',
		text: 'Customers',
		enabled: true,
		menuItems: [OM1, OM2]
	}

	/** @type {CustomType<multilevelmenu-multilevelmenu.MenuItem>} */
	var OOM = {
		itemId: 'Other',
		text: 'Other',
		enabled: true,
		menuItems: [OM1, OM2, OM3]
	}

	elements.menu.addMenuItem(OM)
	elements.menu.addMenuItem(CM)
	elements.menu.addMenuItem(OOM)
	elements.menu.addMenuItem(OM1)
	elements.menu.addMenuItem(OM2)
	elements.menu.addMenuItem(OM3)
}

/**
 * @param {object} menuItemId
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FE227ADC-CE0E-4765-884F-909AC3FEF431"}
 */
function onMenuItemSelected(menuItemId, event) {
	application.output('Selected: ' + menuItemId)
	if (menuItemId == 'customers' || menuItemId == 'orders') {
		elements.tab.removeAllTabs();
		elements.tab.addTab(menuItemId);
	}
	return false;
}
