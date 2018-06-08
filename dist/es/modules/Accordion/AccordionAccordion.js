import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _isNil from "lodash/isNil";
import _each from "lodash/each";
import _invoke from "lodash/invoke";
import _without from "lodash/without";
import _includes from "lodash/includes";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AutoControlledComponent as Component, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import AccordionContent from './AccordionContent';
import AccordionTitle from './AccordionTitle';
/**
 * An Accordion can contain sub-accordions.
 */

var AccordionAccordion =
/*#__PURE__*/
function (_Component) {
  _inherits(AccordionAccordion, _Component);

  function AccordionAccordion() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, AccordionAccordion);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AccordionAccordion)).call.apply(_getPrototypeOf2, [this].concat(args))), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeNewIndex", function (index) {
      var exclusive = _this.props.exclusive;
      var activeIndex = _this.state.activeIndex;
      if (exclusive) return index === activeIndex ? -1 : index; // check to see if index is in array, and remove it, if not then add it

      return _includes(activeIndex, index) ? _without(activeIndex, index) : _toConsumableArray(activeIndex).concat([index]);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTitleOverrides", function (predefinedProps) {
      return {
        onClick: function onClick(e, titleProps) {
          var index = titleProps.index;

          var activeIndex = _this.computeNewIndex(index);

          _this.trySetState({
            activeIndex: activeIndex
          });

          _invoke(predefinedProps, 'onClick', e, titleProps);

          _invoke(_this.props, 'onTitleClick', e, titleProps);
        }
      };
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isIndexActive", function (index) {
      var exclusive = _this.props.exclusive;
      var activeIndex = _this.state.activeIndex;
      return exclusive ? activeIndex === index : _includes(activeIndex, index);
    }), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderPanels", function () {
      var children = [];
      var panels = _this.props.panels;

      _each(panels, function (panel, index) {
        var content = panel.content,
            title = panel.title;

        var active = _this.isIndexActive(index);

        children.push(AccordionTitle.create(title, {
          defaultProps: {
            active: active,
            index: index
          },
          overrideProps: _this.handleTitleOverrides
        }));
        children.push(AccordionContent.create(content, {
          defaultProps: {
            active: active
          }
        }));
      });

      return children;
    }), _temp));
  }

  _createClass(AccordionAccordion, [{
    key: "getInitialAutoControlledState",
    value: function getInitialAutoControlledState(_ref) {
      var exclusive = _ref.exclusive;
      return {
        activeIndex: exclusive ? -1 : [-1]
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children;
      var classes = cx('accordion', className);
      var rest = getUnhandledProps(AccordionAccordion, this.props);
      var ElementType = getElementType(AccordionAccordion, this.props);
      return React.createElement(ElementType, _extends({}, rest, {
        className: classes
      }), _isNil(children) ? this.renderPanels() : children);
    }
  }]);

  return AccordionAccordion;
}(Component);

_defineProperty(AccordionAccordion, "defaultProps", {
  exclusive: true
});

_defineProperty(AccordionAccordion, "autoControlledProps", ['activeIndex']);

_defineProperty(AccordionAccordion, "handledProps", ["activeIndex", "as", "children", "className", "defaultActiveIndex", "exclusive", "onTitleClick", "panels"]);

export { AccordionAccordion as default };
AccordionAccordion.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Index of the currently active panel. */
  activeIndex: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number])]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number])]),

  /** Only allow one panel open at a time. */
  exclusive: PropTypes.bool,

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

  /** Shorthand array of props for Accordion. */
  panels: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.arrayOf(PropTypes.shape({
    content: customPropTypes.itemShorthand,
    title: customPropTypes.itemShorthand
  }))])
} : {};
AccordionAccordion.create = createShorthandFactory(AccordionAccordion, function (content) {
  return {
    content: content
  };
});