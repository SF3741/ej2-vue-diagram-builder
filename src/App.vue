<template>
<div class='diagrambuilder-container' >
  <div class='header navbar'>
    <div class="db-header-container">
       <div class="db-diagram-name-container">
                <span id='diagramName' style="width:250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" class="db-diagram-name"
                    v-on:click='renameDiagram'>Untitled Diagram</span>
                <input id='diagramEditable' type="text" class="db-diagram-name" v-on:keydown='diagramNameKeyDown' v-on:focusout='diagramNameChange'/>
                <span id='diagramreport' class="db-diagram-name db-save-text"></span>
            </div>
        <div class='db-menu-container'>
              <div class="db-menu-style">
                 <ejs-dropdownbutton id="btnFileMenu" cssClass='db-dropdown-menu' :items="fileitems">File </ejs-dropdownbutton>
              </div>
              <div class="db-menu-style">
                 <ejs-dropdownbutton id="btnEditMenu" cssClass='db-dropdown-menu' :items="edititems">Edit </ejs-dropdownbutton>
              </div>
              <div class="db-menu-style">
                 <ejs-dropdownbutton id="btnViewMenu" cssClass='db-dropdown-menu' :items="viewitems">View </ejs-dropdownbutton>
              </div>
              <div class="db-menu-style">
                 <ejs-dropdownbutton id="btnArrangeMenu" cssClass='db-dropdown-menu' :items="arrangeitems">Arrange </ejs-dropdownbutton>
              </div>
              <div class="db-menu-style">
                 <ejs-dropdownbutton id="btnWindowMenu" cssClass='db-dropdown-menu' :items="windowitems">Window </ejs-dropdownbutton>
              </div>
              <div class="db-menu-style"  style="display: none">
                 <ejs-dropdownbutton ejs-dropdownbutton id="btnHelpMenu" cssClass='db-dropdown-menu' :items="helpitems">Help </ejs-dropdownbutton>
              </div>
        </div>
       </div>
      <div class='db-toolbar-editor'>
        <div class='db-toolbar-container'>
          <ejs-toolbar id='toolbarEditor' >
            <e-items>
              <e-item prefixIcon="sf-icon-Undo tb-icons" tooltipText="Undo" cssClass="tb-item-start tb-item-undo"></e-item>
              <e-item prefixIcon="sf-icon-Redo tb-icons" tooltipText="Redo" cssClass="tb-item-end tb-item-redo"></e-item>
              <e-item type="Separator"> </e-item>
              <e-item prefixIcon="sf-icon-ZoomOut tb-icons" tooltipText="Zoom Out(Ctrl + -)" cssClass="tb-item-start"></e-item>
              <e-item cssClass="tb-item-end tb-zoom-dropdown-btn">
                            <ng-template >
                                <ejs-dropdownbutton id="btnZoomIncrement"
                                    >
                                </ejs-dropdownbutton>
                            </ng-template>
                        </e-item>
               <e-item prefixIcon="sf-icon-ZoomIn tb-icons" tooltipText="Zoom In(Ctrl + +)" cssClass="tb-item-end"></e-item>
              <e-item type="Separator"></e-item>
              <e-item prefixIcon="sf-icon-Pan tb-icons" tooltipText="Pan Tool" cssClass="tb-item-start"></e-item>
              <e-item prefixIcon="sf-icon-Selector tb-icons" tooltipText="Pointer" cssClass="tb-item-middle tb-item-selected"></e-item>
               <e-item tooltipText="Draw Shapes" cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable">
                            <ng-template>
                                <button id='btnDrawShape' ejs-dropdownbutton [items]='dropDownDataSources.drawShapesList' iconCss='sf-icon-DrawingMode'
                                    (select)="drawShapeChange($event)">
                                </button>
                            </ng-template>
                        </e-item>
                        <e-item tooltipText="Draw Connectors" cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable">
                            <ng-template >
                                <button id='btnDrawConnector' ejs-dropdownbutton [items]='dropDownDataSources.drawConnectorsList' iconCss='sf-icon-ConnectorMode'
                                    (select)="drawConnectorChange($event)">
                                </button>
                            </ng-template>
                        </e-item>
                         <e-item prefixIcon="sf-icon-TextInput tb-icons" tooltipText="Text Tool" cssClass="tb-item-end tb-custom-diagram-disable">
                        </e-item>
                        <e-item type="Separator">
                        </e-item>
                        <e-item prefixIcon="sf-icon-ColorPickers tb-icons" mode="Palette" tooltipText="Fill Color" cssClass="tb-item-start tb-item-fill">
                        </e-item>
                        <e-item prefixIcon="sf-icon-Pickers tb-icons" mode="Palette" tooltipText="Border Color" cssClass="tb-item-end tb-item-stroke">
                        </e-item>
                        <!-- <e-item prefixIcon="sf-icon-Pickers tb-icons" tooltipText="Format" cssClass="tb-item-end">
                        </e-item> -->
                        <e-item type="Separator">
                        </e-item>
                         <e-item prefixIcon="sf-icon-Group tb-icons" tooltipText="Group" cssClass="tb-item-start tb-item-align-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-Ungroup tb-icons" tooltipText="Ungroup" cssClass="tb-item-end tb-item-ungroup">
                        </e-item>
                        <e-item type="Separator">
                        </e-item>
                         <e-item prefixIcon="sf-icon-Lock tb-icons" tooltipText="Lock" cssClass="tb-item-start tb-item-lock-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-Delete tb-icons" tooltipText="Delete" cssClass="tb-item-end tb-item-lock-category">
                        </e-item>
                        <e-item type="Separator">
                        </e-item>
                         <e-item prefixIcon="sf-icon-Layers tb-icons" tooltipText="Show Layers" cssClass="tb-item-start tb-custom-diagram-disable">
                        </e-item>
                        <e-item prefixIcon="db-theme-svg tb-icons" tooltipText="Themes" cssClass="tb-item-end tb-custom-diagram-disable">
                        </e-item>
                        <e-item type="Separator">
                        </e-item>
                        <e-item tooltipText="Order" cssClass="tb-item-end tb-item-order tb-dropdown-btn-icon">
                            <ng-template >
                                <button ejs-dropdownbutton [items]='dropDownDataSources.orderCommandsList' iconCss='sf-icon-Order' (select)="orderCommandsChange($event)">
                                </button>
                            </ng-template>
                        </e-item>
                        <e-item type="Separator">
                        </e-item>
                        <e-item prefixIcon="sf-icon-AlignLeft tb-icons" tooltipText="Align Left" cssClass="tb-item-start tb-item-align-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-AlignHorizontally tb-icons" tooltipText="Align Center" cssClass="tb-item-middle  tb-item-align-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-AlignRight tb-icons" tooltipText="Align Right" cssClass="tb-item-middle tb-item-align-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-AilgnTop tb-icons" tooltipText="Align Top" cssClass="tb-item-middle tb-item-align-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-AlignVertically tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle tb-item-align-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-AlignBottom tb-icons" tooltipText="Align Bottom" cssClass="tb-item-middle tb-item-align-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-DistributeHorizontal tb-icons" tooltipText="Distribute Objects Vertically" cssClass="tb-item-middle tb-item-space-category">
                        </e-item>
                        <e-item prefixIcon="sf-icon-DistributeVertical tb-icons" tooltipText="Distribute Objects Horizontally" cssClass="tb-item-end tb-item-space-category">
                        </e-item>
            </e-items>
            </ejs-toolbar>
        </div>
       <div class="db-toolbar-hide-btn">
                <button ejs-button id="btnHideToolbar" iconCss='sf-icon-Collapse tb-icons'>
                </button>
            </div>
     </div>

  </div>
   <div class='row content'>
        <div class='sidebar show-overview'>
            <div class="db-palette-parent">
                <!-- <div id="symbolpalette"></div> -->
                <ejs-symbolpalette id="symbolpalette"  :width="width" :height="height" :symbolHeight="symbolHeight" :symbolWidth="symbolWidth" :expandMode='expandMode'
                    :palettes='palettes' :symbolMargin='symbolMargin' :getSymbolInfo='getSymbolInfo' :getNodeDefaults='getNodeDefaults' :enableSearch="enableSearch">
                </ejs-symbolpalette>
            </div>
            <div class="db-overview-parent">
                <div id="overview"></div>
            </div>
            <div id="moreShapesDiv" class="db-palette-more-shapes">
                <div id='overviewspan' class="db-overview">
                    <span></span>
                </div>
              <div class="db-palette-more-shapes-text" @click="moreShapesClick()">More Shapes </div>
            </div>
        </div>
        <div class='main-content' role='main'>
            <div class="db-diagram-container">
                <div id="diagramContainerDiv" class='db-current-diagram-container'>
                   <ejs-diagram id="diagram" :width="width" :height="height"></ejs-diagram>
                </div>
                <div class="db-more-diagram-options-container">
                    <div id="pageOptionList">
                    </div>
                </div>
            </div>
          <div class='db-property-editor-container' style="overflow:auto;">
               <div id="generalDiagramContainer" class="db-general-diagram-prop-container">
                   <div id='diagramPropertyContainer' class="db-diagram-prop-container">
                     <div class="row db-prop-header-text">
                            Page Settings
                        </div>
                    <div class="row db-prop-row">
                            <ejs-dropdownlist id= "pageSettingsList" :dataSource="dataSource"
                                :fields='fields' >
                            </ejs-dropdownlist>
                    </div>
                    <div class="row db-prop-row" id="pageOrientation">
                            <div class="col-xs-3 db-prop-col-style" style="margin-right: 8px;width: 30%;">
                                <ejs-radiobutton id="pagePortrait" label="Portrait" name="pageSettings" :checked="checked"
                                   ></ejs-radiobutton>
                            </div>
                    <div class="col-xs-3 db-prop-col-style">
                                <ejs-radiobutton id="pageLandscape" label="Landscape" name="pageSettings" :checked="checked"
                                    ></ejs-radiobutton>
                            </div>
                        </div>
                    <div class="row db-prop-row" id='pageDimension' style="display:none">
                            <div class="col-xs-6 db-col-left">
                                <div class="db-text-container">
                                    <div class="db-text">
                                        <span>W</span>
                                    </div>
                                    <div class="db-text-input">
                                        <ejs-numerictextbox id="pageWidth" min="100" format="n0"></ejs-numerictextbox>
                                    </div>
                                </div>
                            </div>
                                <div class="col-xs-6 db-col-right">
                                <div class="db-text-container">
                                    <div class="db-text">
                                        <span>H</span>
                                    </div>
                                    <div class="db-text-input">
                                        <ejs-numerictextbox id="pageHeight" min="100" format="n0" ></ejs-numerictextbox>
                                    </div>
                                </div>
                            </div>
                          </div>
                            <div class="row db-prop-row">
                            <div class="col-xs-6 db-col-left">
                                <div class="db-color-container">
                                    <div class="db-color-input">
                                       <ejs-colorpicker mode="Palette" width="100%"  value="255" ></ejs-colorpicker>
                                    </div>
                                    <div class="db-color-btn">
                                        <ejs-button iconCss='sf-icon-ColorPickers tb-icons'>
                                        </ejs-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="row db-prop-row">
                            <ejs-checkbox id='showPageBreaks' label="Page Breaks" checked="true" >
                            </ejs-checkbox>
                        </div>
                    </div>
                   <div id='nodePropertyContainer' class="db-node-prop-container" style="display:none">
                     <div class="db-node-behaviour-prop">
                            <div class="row db-prop-header-text">
                                Dimensions
                            </div>
                            <div class="row db-prop-row">
                                <div class="col-xs-6 db-col-left">
                                    <div class="db-text-container">
                                        <div class="db-text">
                                            <span>X</span>
                                        </div>
                                        <div class="db-text-input">
                                            <ejs-numerictextbox id="nodeOffsetX" format="n0" ></ejs-numerictextbox>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 db-col-right">
                                    <div class="db-text-container">
                                        <div class="db-text">
                                            <span>Y</span>
                                        </div>
                                        <div class="db-text-input">
                                            <ejs-numerictextbox id="nodeOffsetY" format="n0" ></ejs-numerictextbox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row db-prop-row">
                                <div class="col-xs-6 db-col-left">
                                    <div class="db-text-container">
                                        <div class="db-text">
                                            <span>W</span>
                                        </div>
                                        <div class="db-text-input">
                                            <ejs-numerictextbox id="nodeWidth" min="1" format="n0" ></ejs-numerictextbox>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-6 db-col-right">
                                    <div class="db-text-container">
                                        <div class="db-text">
                                            <span>H</span>
                                        </div>
                                        <div class="db-text-input">
                                            <ejs-numerictextbox id="nodeHeight" min="1" format="n0" ></ejs-numerictextbox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <div class="row db-prop-row">
                                <div class="col-xs-6 db-col-left">
                                    <ejs-checkbox id='aspectRatio' label="Aspect Ratio" ></ejs-checkbox>
                                </div>
                            </div>
                          <div class="row db-prop-row">
                                <div class="col-xs-6 db-col-left">
                                    <span class="db-prop-text-style">Rotate</span>
                                </div>
                            </div>
                             <div class="row">
                                <div class="col-xs-6 db-col-left">
                                    <div class="db-text-container">
                                        <div class="db-text">
                                            <ejs-button iconCss='sf-icon-Rotate1 tb-icons'>
                                            </ejs-button>
                                        </div>
                                        <div class="db-text-input">
                                            <ejs-numerictextbox id="nodeRotateAngle" format="n0" ></ejs-numerictextbox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div class="db-prop-separator">
                            </div>
                            <div class="row db-prop-header-text">
                                Insert
                            </div>
                          <div class="row db-prop-row">
                                <div class="col-xs-6 db-col-left">
                                    <ejs-toolbar id='toolbarNodeInsert'  overflowMode='Scrollable' >
                                        <e-items>
                                            <e-item prefixIcon="sf-icon-InsertLink tb-icons" tooltipText="Insert Link" cssClass="tb-item-start">
                                            </e-item>
                                            <e-item prefixIcon="sf-icon-InsertImage tb-icons" tooltipText="Insert Image" cssClass="tb-item-end">
                                            </e-item>
                                        </e-items>
                                    </ejs-toolbar>
                                </div>
                            </div>
                          <div class="db-prop-separator">
                            </div>
                        </div>
                        <div id='nodeStyleProperties' class="db-node-style-prop">
                            <div class="row db-background-style">
                                <div class="row db-prop-header-text">
                                    Background and Border Styles
                                </div>
                        <div class="row db-prop-row">
                                    <div class="col-xs-6 db-col-left">
                                        <div class="db-color-container">
                                            <div class="db-color-input">
                                                <ejs-colorpicker id="nodeFillColor" type="color" mode="Palette" ></ejs-colorpicker>
                                            </div>
                                            <div class="db-color-btn">
                                                <ejs-button iconCss='sf-icon-ColorPickers tb-icons'>
                                                </ejs-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                      <div id='gradientStyle' class="row db-prop-row db-gradient-style-hide">
                                    <div class="col-xs-4 db-col-left">
                                        <ejs-checkbox id='gradient' label="Gradient" ></ejs-checkbox>
                                    </div>
                                    <div class="col-xs-4 db-col-center">
                                        <ejs-dropdownlist  :dataSource='dataSource'
                                            fields='fields' popupWidth='200px'>
                                        </ejs-dropdownlist>
                                    </div>
                                    <div class="col-xs-4 db-col-right">
                                        <div class="db-color-container">
                                            <div class="db-color-input">
                                                <ejs-colorpicker id="nodeGradientColor" type="color" mode="Palette"
                                                ></ejs-colorpicker>
                                            </div>
                                            <div class="db-color-btn">
                                                <ejs-button iconCss='sf-icon-ColorPickers tb-icons'>
                                                </ejs-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                      <div class="row db-border-style">
                        <div class="row db-prop-header-text db-border-style-header">
                                    Border/Line Styles
                                </div>
                                <div class="row db-prop-row">
                                    <div class="col-xs-4 db-col-right">
                                        <span class="db-prop-text-style">Stroke Color</span>
                                    </div>
                                    <div class="col-xs-4 db-col-center">
                                        <span class="db-prop-text-style">Stroke Style</span>
                                    </div>
                                    <div class="col-xs-4 db-col-left">
                                        <span class="db-prop-text-style">Stroke Width</span>
                                    </div>
                                </div> -->
                          <div class="row">
                                    <div class="col-xs-4 db-col-left">
                                        <div class="db-color-container">
                                            <div class="db-color-input">
                                                <ejs-colorpicker id="nodeStrokeColor" type="color" mode="Palette"
                                                > </ejs-colorpicker>
                                            </div>
                                            <div class="db-color-btn">
                                                <ejs-button iconCss='sf-icon-Pickers tb-icons'>
                                                </ejs-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 db-col-center">
                                        <ejs-dropdownlist id="nodeBorderStyle"   :dataSource='dataSource'
                                            popupWidth='160px' :fields='fields' :itemTemplate =" `<span><span class='db-ddl-template-style'>{{className}}</span></span>`"
                                      :valueTemplate ="`<span><span class='db-ddl-template-style'>{{className}}</span></span>`">
                                      </ejs-dropdownlist>
                                    </div>
                                    <div class="col-xs-4 db-col-right">
                                        <ejs-numerictextbox id="nodeStrokeWidth" min="0" step="0.5" ></ejs-numerictextbox>
                                    </div>
                                </div>
                              <div class="row db-prop-row">
                                    <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                                        <span class="db-prop-text-style">Opacity</span>
                                    </div>
                                    <div class="col-xs-8 db-col-left" style="padding-right:10px">
                                        <ejs-slider  min='0' max='100' step='10' type='MinRange'>
                                        </ejs-slider>
                                    </div>
                                    <div class="col-xs-2 db-col-right">
                                        <input type="text"  readOnly="true" class="db-readonly-input" />
                                    </div>
                                </div>
                        </div>
                    </div>
                  </div>
                  <div id='connectorPropertyContainer' class="db-connector-prop-container" style="display:none">
                        <div class="row db-prop-header-text">
                            Connector Properties
                        </div>
                         <div class="row db-prop-row">
                            <div class="col-xs-6 db-col-left db-prop-text-style">
                                <span class="db-prop-text-style">Connector Type</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6 db-col-left">
                                <ejs-dropdownlist  :dataSource='dataSource' :fields='fields'>
                                </ejs-dropdownlist>
                            </div>
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-6 db-col-left">
                                <div class="db-color-container">
                                    <div class="db-color-input">
                                        <ejs-colorpicker id="lineColor" mode="Palette" type="color"
                                        ></ejs-colorpicker>
                                    </div>
                                    <div class="db-color-btn">
                                        <ejs-button iconCss='sf-icon-Pickers tb-icons'>
                                        </ejs-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div class="row db-prop-row">
                            <div class="col-xs-8 db-col-left db-prop-text-style">
                                <span class="db-prop-text-style">Stroke Style</span>
                            </div>
                            <div class="col-xs-4 db-col-right db-prop-text-style">
                                <span class="db-prop-text-style">Thickness</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 db-col-left">
                                <ejs-dropdownlist id="lineStyle"   :dataSource='dataSource' :fields='fields'
                                 :itemTemplate =" `<span><span class='db-ddl-template-style'>{{data.className}}</span></span>`"
                                      :valueTemplate ="`<span><span class='db-ddl-template-style'>{{data.className}}</span></span>`"  >
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-xs-4 db-col-right">
                                <ejs-numerictextbox min="0.5" step="0.5" ></ejs-numerictextbox>
                            </div>
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-8 db-col-left db-prop-text-style">
                                <span class="db-prop-text-style">Start Arrow</span>
                            </div>
                            <div class="col-xs-4 db-col-right db-prop-text-style">
                                <span class="db-prop-text-style">Size</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 db-col-left">
                                <ejs-dropdownlist :dataSource='dataSource' :fields='fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-xs-4 db-col-right">
                                <ejs-numerictextbox min="1" step="1" ></ejs-numerictextbox>
                            </div>
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-8 db-col-left db-prop-text-style">
                                <span class="db-prop-text-style">End Arrow</span>
                            </div>
                            <div class="col-xs-4 db-col-right db-prop-text-style">
                                <span class="db-prop-text-style">Size</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8 db-col-left">
                                <ejs-dropdownlist :dataSource='dataSource' :fields='fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-xs-4 db-col-right">
                                <ejs-numerictextbox min="1" step="1" ></ejs-numerictextbox>
                            </div>
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-8 db-col-left" style="margin-top:5px">
                                <ejs-checkbox id='lineJump' label="Bridging" checked="true"></ejs-checkbox>
                            </div>
                            <div class="col-xs-4 db-col-right" id="lineJumpSizeDiv" style="display:none">
                                <ejs-numerictextbox min="1" step="1" ></ejs-numerictextbox>
                            </div>
                        </div>
                      <div class="row db-prop-row">
                            <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                                <span class="db-prop-text-style">Opacity</span>
                            </div>
                            <div class="col-xs-8 db-col-left" style="padding-right:10px">
                                <ejs-slider id='default' min='0' max='100' step='10' type='MinRange'>
                                </ejs-slider>
                            </div>
                            <div class="col-xs-2 db-col-right">
                                <input type="text"  readonly="true" class="db-readonly-input" />
                            </div>
                        </div>
                    </div>
            <div id='textPropertyContainer' class="db-text-prop-container" style="display:none">
                        <div class="db-prop-separator">
                        </div>
                        <div class="row db-prop-header-text">
                            Text
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-8 db-col-left">
                                <ejs-dropdownlist id="fontFamily" height='34px'  :dataSource='dataSource' :fields='fields'
                                    >
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-xs-4 db-col-right">
                                <ejs-numerictextbox min="1" step="1" ></ejs-numerictextbox>
                            </div>
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-6 db-col-left" id="textPositionDiv">
                                <ejs-dropdownlist id="ddlTextPosition"  :dataSource='dataSource' :fields='fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-xs-6 db-col-right" id="textColorDiv">
                                <div class="db-color-container">
                                    <div class="db-color-input">
                                        <ejs-colorpicker id='textColor'  mode="Palette" type="color"  ></ejs-colorpicker>
                                    </div>
                                    <div class="db-color-btn">
                                        <ejs-button iconCss='sf-icon-ColorPickers tb-icons'>
                                        </ejs-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-6 db-col-left">
                                <ejs-toolbar id='toolbarTextStyle' overflowMode='Scrollable' >
                                    <e-items>
                                        <e-item prefixIcon="sf-icon-Bold tb-icons" tooltipText="Bold" cssClass="tb-item-start">
                                        </e-item>
                                        <e-item prefixIcon="sf-icon-Italic tb-icons" tooltipText="Italic" cssClass="tb-item-middle">
                                        </e-item>
                                        <e-item prefixIcon="sf-icon-Underline tb-icons" tooltipText="Underline" cssClass="tb-item-end">
                                        </e-item>
                                    </e-items>
                                </ejs-toolbar>
                            </div>
                            <div class="col-xs-6 db-col-right">
                                <ejs-toolbar id='toolbarTextSubAlignment' overflowMode='Scrollable' >
                                    <e-items>
                                        <e-item prefixIcon="sf-icon-ParaAlignLeft tb-icons" tooltipText="Align Text Left" cssClass="tb-item-start">
                                        </e-item>
                                        <e-item prefixIcon="sf-icon-ParaAlignCenter tb-icons" tooltipText="Align Text Center" cssClass="tb-item-middle">
                                        </e-item>
                                        <e-item prefixIcon="sf-icon-ParaAlignRight tb-icons" tooltipText="Align Text Right" cssClass="tb-item-end">
                                        </e-item>
                                    </e-items>
                                </ejs-toolbar>
                            </div>
                        </div>
                        <div class="row db-prop-row" id='toolbarTextAlignmentDiv'>
                            <ejs-toolbar id='toolbarTextAlignment' overflowMode='Scrollable' >
                                <e-items>
                                    <e-item prefixIcon="sf-icon-TextLeft tb-icons" tooltipText="Align Right" cssClass="tb-item-start">
                                    </e-item>
                                    <e-item prefixIcon="sf-icon-TextVerticalCenter tb-icons" tooltipText="Align Center" cssClass="tb-item-middle">
                                    </e-item>
                                    <e-item prefixIcon="sf-icon-TextRight tb-icons" tooltipText="Align Left" cssClass="tb-item-middle">
                                    </e-item>
                                    <e-item prefixIcon="sf-icon-TextTop tb-icons" tooltipText="Align Bottom" cssClass="tb-item-middle">
                                    </e-item>
                                    <e-item prefixIcon="sf-icon-TextHorizontalCenter tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle">
                                    </e-item>
                                    <e-item prefixIcon="sf-icon-TextBottom tb-icons" tooltipText="Align Top" cssClass="tb-item-end">
                                    </e-item>
                                </e-items>
                            </ejs-toolbar>
                        </div>
                        <div class="row db-prop-row">
                            <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                                <span class="db-prop-text-style">Opacity</span>
                            </div>
                            <div class="col-xs-8 db-col-left" style="padding-right:10px">
                                <ejs-slider  min='0' max='100' step='10' type='MinRange'>
                                </ejs-slider>
                            </div>
                            <div class="col-xs-2 db-col-right">
                                <input id='textOpacityText' type="text" class="db-readonly-input" readOnly="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
         <div id='mindMapContainer' class="db-mindmap-prop-container">
                    <div class="row db-prop-header-text">
                        MindMap Pattern
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="mindmap-pattern-style mindmap-pattern1"></div>
                        </div>
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="mindmap-pattern-style mindmap-pattern2"></div>
                        </div>
                    </div>
                    <div class="row db-prop-row" style="margin-top:5px">
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="mindmap-pattern-style mindmap-pattern3"></div>
                        </div>
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="mindmap-pattern-style mindmap-pattern4"></div>
                        </div>
                    </div>
                    <div class="db-prop-separator">
                    </div>
                    <div class="row db-prop-header-text">
                        MindMap Levels Styles
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-6 db-col-left">
                            <ejs-dropdownlist id="mindMapLevels"   :dataSource='dataSource' :fields='fields'
                                >
                            </ejs-dropdownlist>
                        </div>
                    </div>
                    <div id='mindMapFill' class="row db-prop-row">
                        <div class="col-xs-6 db-col-left">
                            <div class="db-color-container">
                                <div class="db-color-input">
                                    <ejs-colorpicker id='mindmapFill'  mode="Palette"  type="color" ></ejs-colorpicker>
                                </div>
                                <div class="db-color-btn">
                                    <ejs-button iconCss='sf-icon-ColorPickers tb-icons'>
                                    </ejs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-4 db-col-left">
                            <div class="db-color-container">
                                <div class="db-color-input">
                                    <ejs-colorpicker id='mindmapStroke'  mode="Palette" type="color" ></ejs-colorpicker>
                                </div>
                                <div class="db-color-btn">
                                    <ejs-button iconCss='sf-icon-Pickers tb-icons'>
                                    </ejs-button>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-4 db-col-center">
                            <ejs-dropdownlist  :dataSource='dataSource' :fields='fields'
                                popupWidth='160px' :itemTemplate =" `<span><span class='db-ddl-template-style'>{{data.className}}</span></span>`"
                                      :valueTemplate ="`<span><span class='db-ddl-template-style'>{{data.className}}</span></span>`" >
                         </ejs-dropdownlist>
                        </div>
                        <div class="col-xs-4 db-col-right">
                            <ejs-numerictextbox min="0.5" step="0.5" ></ejs-numerictextbox>
                        </div>
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                            <span class="db-prop-text-style">Opacity</span>
                        </div>
                        <div class="col-xs-8 db-col-left" style="padding-right:10px">
                            <ejs-slider min='0' max='100' step='10' type='MinRange'>
                            </ejs-slider>
                        </div>
                        <div class="col-xs-2 db-col-right">
                            <input type="text" readOnly="true"  class="db-readonly-input" />
                        </div>
                    </div>
                    <div style="margin-top:10px;margin-bottom: 15px"></div>
                    <div class="row db-prop-header-text">
                        Text Style
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-8 db-col-left">
                            <ejs-dropdownlist height='34px'  :dataSource='dataSource' :fields='fields'>
                            </ejs-dropdownlist>
                        </div>
                        <div class="col-xs-4 db-col-right">
                            <ejs-numerictextbox min="1" step="1"></ejs-numerictextbox>
                        </div>
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-6 db-col-left">
                            <ejs-toolbar overflowMode='Scrollable' >
                                <e-items>
                                    <e-item prefixIcon="sf-icon-Bold tb-icons" tooltipText="Bold" cssClass="tb-item-start">
                                    </e-item>
                                    <e-item prefixIcon="sf-icon-Italic tb-icons" tooltipText="Italic" cssClass="tb-item-middle">
                                    </e-item>
                                    <e-item prefixIcon="sf-icon-Underline tb-icons" tooltipText="Underline" cssClass="tb-item-end">
                                    </e-item>
                                </e-items>
                            </ejs-toolbar>
                        </div>
                        <div class="col-xs-6 db-col-right" id="textColorDiv">
                            <div class="db-color-container">
                                <div class="db-color-input">
                                    <ejs-colorpicker id='mindmapTextColor' mode="Palette" type="color" ></ejs-colorpicker>
                                </div>
                                <div class="db-color-btn">
                                    <ejs-button iconCss='sf-icon-ColorPickers tb-icons'>
                                    </ejs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-2 db-col-right db-prop-text-style" style="padding-top: 6px">
                            <span class="db-prop-text-style">Opacity</span>
                        </div>
                        <div class="col-xs-8 db-col-left" style="padding-right:10px">
                            <ejs-slider  min='0' max='100' step='10' type='MinRange'>
                            </ejs-slider>
                        </div>
                        <div class="col-xs-2 db-col-right">
                            <input type="text"  class="db-readonly-input" readOnly="true" />
                        </div>
                    </div>
                </div>
               <div id='orgChartContainer' class="db-orgchart-prop-container">
                    <div class="row db-prop-row db-prop-header-text">
                        Import
                    </div>
                    <div class="row db-prop-row" style="height:28px">
                        <ejs-button id="btnImportData" content="Import Data" cssClass="db-btn-primary" >
                        </ejs-button>
                    </div>
                    <div class="db-prop-separator">
                    </div>
                    <div class="row db-prop-header-text">
                        OrgChart Settings
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-6 db-col-left">
                            <span class="db-prop-text-style">Horizontal Spacing</span>
                        </div>
                        <div class="col-xs-6 db-col-right">
                            <span class="db-prop-text-style">Vertical Spacing</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 db-col-left">
                            <ejs-numerictextbox id="orgHorizontalSpacing" min="25" step="1" format="n0" value="50" ></ejs-numerictextbox>
                        </div>
                        <div class="col-xs-6 db-col-right">
                            <ejs-numerictextbox id="orgVerticalSpacing" min="25" step="1" format="n0" value="50" ></ejs-numerictextbox>
                        </div>
                    </div>
                    <div class="row db-prop-row">
                        <ejs-toolbar id='orgChartAlignment' overflowMode='Scrollable' >
                            <e-items>
                                <e-item prefixIcon="sf-icon-TextLeft tb-icons" tooltipText="Align Left" cssClass="tb-item-start">
                                </e-item>
                                <e-item prefixIcon="sf-icon-TextHorizontalCenter tb-icons" tooltipText="Align Center" cssClass="tb-item-middle">
                                </e-item>
                                <e-item prefixIcon="sf-icon-TextRight tb-icons" tooltipText="Align Right" cssClass="tb-item-middle">
                                </e-item>
                                <e-item prefixIcon="sf-icon-TextTop tb-icons" tooltipText="Align Top" cssClass="tb-item-middle">
                                </e-item>
                                <e-item prefixIcon="sf-icon-TextVerticalCenter tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle">
                                </e-item>
                                <e-item prefixIcon="sf-icon-TextBottom tb-icons" tooltipText="Align Bottom" cssClass="tb-item-end">
                                </e-item>
                            </e-items>
                        </ejs-toolbar>
                    </div>
                    <div class="db-prop-separator">
                    </div>
                    <div class="row db-prop-row db-prop-header-text">
                        Orientation Styles
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="org-pattern-style org-pattern-1 vertical-alternate"
                                style="background-image: url('./assets/dbstyle/orgchart_images/org-pattern1.svg')">
                            </div>
                        </div>
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="org-pattern-style org-pattern-2 vertical-left"
                                style="background-image: url('./assets/dbstyle/orgchart_images/org-pattern2.svg')"></div>
                        </div>
                    </div>
                    <div class="row db-prop-row" style="margin-top:5px">
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="org-pattern-style org-pattern-3 vertical-right"
                                style="background-image: url('./assets/dbstyle/orgchart_images/org-pattern3.svg')"></div>
                        </div>
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="org-pattern-style org-pattern-4 horizontal-center"
                                style="background-image: url('./assets/dbstyle/orgchart_images/org-pattern4.svg')"></div>
                        </div>
                    </div>
                    <div class="row db-prop-row" style="margin-top:5px">
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="org-pattern-style org-pattern-5 horizontal-right"
                                style="background-image: url('./assets/dbstyle/orgchart_images/org-pattern5.svg');"></div>
                        </div>
                        <div class="col-xs-6 org-pattern-parent">
                            <div  class="org-pattern-style org-pattern-6 horizontal-left"
                                style="background-image: url('./assets/dbstyle/orgchart_images/org-pattern6.svg')"></div>
                        </div>
                    </div>
                    <div class="db-prop-separator">
                    </div>
                    <div class="row db-prop-header-text">
                        OrgChart Templates
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-6 org-pattern-parent">
                            <div id="orgPattern1"  class="org-pattern-style"></div>
                        </div>
                        <div class="col-xs-6 org-pattern-parent">
                            <div id="orgPattern2"  class="org-pattern-style"></div>
                        </div>
                    </div>
                    <div class="row db-prop-row">
                        <div class="col-xs-6 org-pattern-parent">
                            <div id="orgPattern3"  class="org-pattern-style"></div>
                        </div>
                        <div class="col-xs-6 org-pattern-parent">
                            <div id="orgPattern4"  class="org-pattern-style"></div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  </div>
<div id="diagramTemplateDiv" class="db-diagram-template-div" style="display: none">
    <div class="db-diagram-template-image-div">
        <div class="db-diagram-template-image">
        </div>
    </div>
    <div class="db-diagram-template-text">
        <span id="diagramTemplateText"></span>
    </div>
</div>

<div id="diagramTemplateDiv1" style="display: none">
    <div class="row">
        <div class="col-xs-3 temp-left-pane">
            <div class="row db-diagram-template-parent-text flowdiagram-template">
                <span>Flow Chart</span>
            </div>
            <div class="row db-diagram-template-parent-text mindmap-template">
                <span>Mind Map</span>
            </div>
            <div class="row db-diagram-template-parent-text orgchart-template">
                <span>Org Chart</span>
            </div>
            <!-- <div class="row db-diagram-template-parent-text bpmn-template" style="height:24px">
                <span>BPMN</span>
            </div> -->
        </div>
        <div class="col-xs-9 diagramTemplates temp-right-pane" style="padding-left:0px;padding-right:0px">
        </div>
    </div>
</div>

<ejs-dialog id="openTemplateDialog" width='695px' height='470px' header='Create New Diagram' :target='app'
    isModal="true" :animationSettings='dialogAnimationSettings' showCloseIcon='true' allowDragging='true' :visible='dialogVisibility'>
</ejs-dialog>





</div>

</template>


<style>
  @import "./../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "./../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
   @import "./../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
   @import './assets/index.css';
@import './assets/dbstyle/diagrambuilder.css';
</style>
<script>

import Vue from "vue";
import {
  Diagram,
  DiagramPlugin,
  NodeModel,
  NodeConstraints,
  HtmlModel,
  Snapping,SymbolPalette,
  SymbolPalettePlugin,
  BpmnDiagrams
} from "@syncfusion/ej2-vue-diagrams";
import { ToolbarComponent, ToolbarPlugin } from '@syncfusion/ej2-vue-navigations';
import { DropDownButtonPlugin } from "@syncfusion/ej2-vue-splitbuttons";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { RadioButtonPlugin,CheckBoxPlugin,ButtonPlugin } from "@syncfusion/ej2-vue-buttons";
import { NumericTextBoxPlugin } from "@syncfusion/ej2-vue-inputs";
import { ColorPickerPlugin ,SliderPlugin} from "@syncfusion/ej2-vue-inputs";
import { ListViewPlugin } from "@syncfusion/ej2-vue-lists";


Vue.use(DropDownButtonPlugin);
Vue.use(DiagramPlugin);
Vue.use(SymbolPalettePlugin);
Vue.use(ToolbarPlugin);
Vue.component(ToolbarPlugin.name, ToolbarComponent);
Vue.use(DialogPlugin);
Vue.use(DropDownListPlugin);
Vue.use(RadioButtonPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);
Vue.use(CheckBoxPlugin);
Vue.use(ButtonPlugin);
Vue.use(SliderPlugin);
Vue.use(ListViewPlugin)
//Initialize the flowshapes for the symbol palatte
let flowshapes = [
   { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' }, style: { strokeWidth: 2 } },
            { id: 'Process', shape: { type: 'Flow', shape: 'Process' }, style: { strokeWidth: 2 } },
            { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' }, style: { strokeWidth: 2 } },
            { id: 'Document', shape: { type: 'Flow', shape: 'Document' }, style: { strokeWidth: 2 } },
            { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' }, style: { strokeWidth: 2 } },
            { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' }, style: { strokeWidth: 2 } },
            { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' }, style: { strokeWidth: 2 } },
            { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' }, style: { strokeWidth: 2 } },
            { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' }, style: { strokeWidth: 2 } },
            { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' }, style: { strokeWidth: 2 } },
            { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' }, style: { strokeWidth: 2 } },
            { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' }, style: { strokeWidth: 2 } },
            { id: 'Or', shape: { type: 'Flow', shape: 'Or' }, style: { strokeWidth: 2 } },
            { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' }, style: { strokeWidth: 2 } },
            { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' }, style: { strokeWidth: 2 } },
            { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' }, style: { strokeWidth: 2 } },
            { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' }, style: { strokeWidth: 2 } },
            { id: 'OffPageReference', shape: { type: 'Flow', shape: 'OffPageReference' }, style: { strokeWidth: 2 } },
            { id: 'SequentialAccessStorage', shape: { type: 'Flow', shape: 'SequentialAccessStorage' }, style: { strokeWidth: 2 } },
            { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' }, style: { strokeWidth: 2 } },
            { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' }, style: { strokeWidth: 2 } },
            { id: 'data', shape: { type: 'Flow', shape: 'Data' }, style: { strokeWidth: 2 } },
            { id: 'Card', shape: { type: 'Flow', shape: 'Card' }, style: { strokeWidth: 2 } },
            { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' }, style: { strokeWidth: 2 } },
            { id: 'Preparation', shape: { type: 'Flow', shape: 'Preparation' }, style: { strokeWidth: 2 } },
            { id: 'Display', shape: { type: 'Flow', shape: 'Display' }, style: { strokeWidth: 2 } },
            { id: 'ManualInput', shape: { type: 'Flow', shape: 'ManualInput' }, style: { strokeWidth: 2 } },
            { id: 'LoopLimit', shape: { type: 'Flow', shape: 'LoopLimit' }, style: { strokeWidth: 2 } },
            { id: 'StoredData', shape: { type: 'Flow', shape: 'StoredData' }, style: { strokeWidth: 2 } }
];
let basicShapes = [
  { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' }, style: { strokeWidth: 2 } },
            { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeWidth: 2 } },
            { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' }, style: { strokeWidth: 2 } },
            { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' }, style: { strokeWidth: 2 } },
            { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' }, style: { strokeWidth: 2 } },
            { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' }, style: { strokeWidth: 2 } },
            { id: 'Star', shape: { type: 'Basic', shape: 'Star' }, style: { strokeWidth: 2 } },
            { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' }, style: { strokeWidth: 2 } },
            { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' }, style: { strokeWidth: 2 } },
            { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' }, style: { strokeWidth: 2 } },
            { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' }, style: { strokeWidth: 2 } },
            { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' }, style: { strokeWidth: 2 } },
            { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' }, style: { strokeWidth: 2 } },
            { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' }, style: { strokeWidth: 2 } },
            { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' }, style: { strokeWidth: 2 } },
];
let bpmnShapes = [
            {
                id: 'BPMNStart', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'None' } },
            },
            {
                id: 'Intermediate', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Intermediate', trigger: 'None' } },
            },
            {
                id: 'End', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'None' } },
            },
            {
                id: 'Gateway', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Gateway' }
            },
            {
                id: 'Task', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } }
            },
            {
                id: 'SubProcessEventBased', style: { strokeWidth: 2 }, shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess',
                        subProcess: { type: 'Transaction', transaction: { success: { visible: false }, failure: { visible: false }, cancel: { visible: false } } }
                    },
                },
            },
            {
                id: 'Message', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Message' }
            },
            {
                id: 'DataObject', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'DataObject' }
            },
            {
                id: 'DataSource', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'DataSource' }
            },
            {
                id: 'Activity', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Activity' }
            },
            {
                id: 'Group', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Group' }
            },
        ];
let connectorSymbols = [
  {
                id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2 }
            },
            {
                id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2, strokeDashArray: '3,3' }
            },
            {
                id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }
            },
            {
                id: 'Link4', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2, strokeDashArray: '3,3' }, targetDecorator: { shape: 'None' }
            },
            {
                id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2 }
            },
            {
                id: 'Link22', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2, strokeDashArray: '3,3' }
            },
            {
                id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }
            },
            {
                id: 'Link24', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2, strokeDashArray: '3,3' }, targetDecorator: { shape: 'None' }
            },
            {
                id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }
            },
            {
                id: 'Link34', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2, strokeDashArray: '3,3' }, targetDecorator: { shape: 'None' }
            }
];

export default {
  name: 'app',
  data () {
    return {
       fileitems: [
        { text: 'New' }, { text: 'Open' }, { separator: true },
            { text: 'Save', iconCss: 'sf-icon-Save' }, { text: 'Save As' },
            // { text: 'Rename' }, { separator: true },
            { text: 'Export', iconCss: 'sf-icon-Export' }, { separator: true },
            { text: 'Print', iconCss: 'sf-icon-Print' }
      ],
      edititems:[
        { text: 'Undo', iconCss: 'sf-icon-Undo' }, { text: 'Redo', iconCss: 'sf-icon-Redo' }, { separator: true },
            { text: 'Cut', iconCss: 'sf-icon-Cut' }, { text: 'Copy', iconCss: 'sf-icon-Copy' },
            { text: 'Paste', iconCss: 'sf-icon-Paste' }, { text: 'Delete', iconCss: 'sf-icon-Delete' }, { separator: true },
            { text: 'Duplicate' }, { separator: true },
            // { text: 'Edit Data' },
            { text: 'Edit Tooltip' }, { separator: true },
            { text: 'Select All' },
      ],
      viewitems:[
        { text: 'Zoom In', iconCss: 'sf-icon-ZoomIn' }, { text: 'Zoom Out', iconCss: 'sf-icon-ZoomOut' }, { separator: true },
            { text: 'Fit To Screen' }, { separator: true },
            { text: 'Show Rulers' }, { text: 'Show Guides', iconCss: 'sf-icon-Selection' },
            { text: 'Show Grid', iconCss: 'sf-icon-Selection' }, { separator: true },
            { text: 'Snap To Grid' }
      ],
      arrangeitems:[
        { text: 'Send To Back', iconCss: 'sf-icon-Sendback' }, { text: 'Bring To Front', iconCss: 'sf-icon-BringFront' },
            { text: 'Send Backward', iconCss: 'sf-icon-SendBackward' }, { text: 'Bring Forward', iconCss: 'sf-icon-BringForward' },
            { separator: true },
            {
                text: 'Align Objects', items: [
                    { text: 'Left', iconCss: 'sf-icon-AlignLeft' }, { text: 'Right', iconCss: 'sf-icon-AlignRight' },
                    { text: 'Center', iconCss: 'sf-icon-AlignHorizontally' }, { text: 'Top', iconCss: 'sf-icon-AilgnTop' },
                    { text: 'Bottom', iconCss: 'sf-icon-AlignBottom' }, { text: 'Middle', iconCss: 'sf-icon-AlignVertically' }
                ]
            },
            {
                text: 'Distribute Objects', items: [
                    { text: 'Horizontally', iconCss: 'sf-icon-DistributeHorizontal' },
                    { text: 'Vertically', iconCss: 'sf-icon-DistributeVertical' }
                ]
            },
            {
                text: 'Match Size', items: [
                    { text: 'Both Width and Height' }, { text: 'Width' }, { text: 'Height' }
                ]
            }, { separator: true },
            { text: 'Lock' }, { text: 'Unlock' }, { separator: true },
            { text: 'Group' }, { text: 'Ungroup' }
      ],
      windowitems:[
        { text: 'Show Toolbar', iconCss: 'sf-icon-Selection' }, { text: 'Show Stencil', iconCss: 'sf-icon-Selection' },
            { text: 'Show Properties', iconCss: 'sf-icon-Selection' }, { text: 'Show Layers' },
            { text: 'Show Pager', iconCss: 'sf-icon-Selection' }, { text: 'Themes' }
      ],
      helpitems:[
        { text: 'Keyboard Shortcuts' }, { text: 'Documentation' }
      ],
      dataSource :[
        { text: 'Letter (8.5 in x 11 in)', value: 'Letter' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
        { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
        { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
        { text: 'A6 (105 mm x 148 mm)', value: 'A6' }, { text: 'Custom', value: 'Custom' },
      ],
      min:"100",
      format:"n0",
      width: "100%",
      height: "1000px",
      expandMode: "Multiple",
      enableSearch:true,
      palettes: [
        {
          id: "flow",
          expanded: true,
          symbols: flowshapes,
          title: "Flow Shapes"
        },
        {
          id: "basic",
          expanded: true,
          symbols: basicShapes,
          title: "Basic Shapes"
        },
        {
          id: "bpmn",
          expanded: true,
          symbols: bpmnShapes,
          title: "BPMN Shapes"
        },
        {
          id: "connectors",
          expanded: true,
          symbols: connectorSymbols,
          title: "Connectors"
        }
      ],
      symbolHeight: 50,
      symbolWidth: 50,
      getNodeDefaults: (symbol) => {
      if (symbol.id === "Terminator" || symbol.id === "Process" || symbol.id ==="basic" || symbol.id==="flow" || symbol.id==="bpmn") {
          symbol.width = 5;
          symbol.height = 5;
        } else if (
          symbol.id === "Document" ||
          symbol.id === "PreDefinedProcess" ||
          symbol.id === "PaperTap" ||
          symbol.id === "DirectData"
        ) {
          symbol.width = 5;
          symbol.height = 5;
        }
        symbol.style = { strokeWidth: 2, strokeColor: "black" };
      },
      getSymbolInfo: (symbol) => {
        return { fit: true };
      },
      symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
    }
  },
   provide :{
    Diagram:[BpmnDiagrams],
    SymbolPalette:[BpmnDiagrams]
    },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
