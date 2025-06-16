import { useEffect } from 'react';

const FamilyTree = () => {
  useEffect(() => {
    // Data structure for the family tree
    const data = {
      id: 'ms',
      data: {
        imageURL: 'https://i.pravatar.cc/300?img=68',
        name: 'Margret Swanson',
      },
      options: {
        nodeBGColor: '#cdb4db',
        nodeBGColorHover: '#cdb4db',
      },
      children: [
        {
          id: 'mh',
          data: {
            imageURL: 'https://i.pravatar.cc/300?img=69',
            name: 'Mark Hudson',
          },
          options: {
            nodeBGColor: '#ffafcc',
            nodeBGColorHover: '#ffafcc',
          },
          children: [
            {
              id: 'kb',
              data: {
                imageURL: 'https://i.pravatar.cc/300?img=65',
                name: 'Karyn Borbas',
              },
              options: {
                nodeBGColor: '#f8ad9d',
                nodeBGColorHover: '#f8ad9d',
              },
            },
            {
              id: 'cr',
              data: {
                imageURL: 'https://i.pravatar.cc/300?img=60',
                name: 'Chris Rup',
              },
              options: {
                nodeBGColor: '#c9cba3',
                nodeBGColorHover: '#c9cba3',
              },
            },
          ],
        },
        {
          id: 'cs',
          data: {
            imageURL: 'https://i.pravatar.cc/300?img=59',
            name: 'Chris Lysek',
          },
          options: {
            nodeBGColor: '#00afb9',
            nodeBGColorHover: '#00afb9',
          },
          children: [
            {
              id: 'Noah_Chandler',
              data: {
                imageURL: 'https://i.pravatar.cc/300?img=57',
                name: 'Noah Chandler',
              },
              options: {
                nodeBGColor: '#84a59d',
                nodeBGColorHover: '#84a59d',
              },
            },
            {
              id: 'Felix_Wagner',
              data: {
                imageURL: 'https://i.pravatar.cc/300?img=52',
                name: 'Felix Wagner',
              },
              options: {
                nodeBGColor: '#0081a7',
                nodeBGColorHover: '#0081a7',
              },
            },
          ],
        },
      ],
    };

    const options = {
      contentKey: 'data',
      width: 800,
      height: 600,
      nodeWidth: 150,
      nodeHeight: 100,
      fontColor: '#fff',
      borderColor: '#333',
      childrenSpacing: 50,
      siblingSpacing: 20,
      direction: 'top',
      enableExpandCollapse: true,
      nodeTemplate: (content) => `
        <div style='display: flex;flex-direction: column;gap: 10px;justify-content: center;align-items: center;height: 100%;'>
          <img style='width: 50px;height: 50px;border-radius: 50%;' src='${content.imageURL}' alt='' />
          <div style="font-weight: bold; font-family: Arial; font-size: 14px">${content.name}</div>
        </div>`,
      canvasStyle: 'border: 1px solid black;background: #f6f6f6;',
      enableToolbar: true,
    };

    if (window.ApexTree) {
      const tree = new window.ApexTree(document.getElementById('svg-tree'), options);
      tree.render(data);
    } else {
      console.error('ApexTree is not available. Make sure it is imported or included properly.');
    }
  }, []);

  return <div id="svg-tree" style={{ width: '100%', height: '600px' }}></div>;
};

export default FamilyTree;
