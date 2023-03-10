import {
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Supplier from './Supplier';
import { removeSupplier, searchSupplier } from './SupplierApi';
import './SupplierList.css';
const SupplierList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const history = useHistory();
  const search = async () => {
    const suppliers = await searchSupplier();
    setSuppliers(suppliers);
  };
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const remove = async (id: string) => {
    await removeSupplier(id);
    search();
  };

  const addSupplier = () => {
    history.push('/page/Suppliers/new');
  };
  const editSupplier = (id: string) => {
    history.push('/page/Suppliers/' + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name || 'Proveedores'} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Gestión de Proveedores </IonTitle>
          <IonItem>
            <IonButton
              onClick={addSupplier}
              color='primary'
              fill='solid'
              slot='end'
            >
              Agregar Proveedor
              <IonIcon icon={add} />
            </IonButton>
          </IonItem>
          <IonGrid fixed={false} className='table'>
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Dirección</IonCol>
              <IonCol>Web</IonCol>
              <IonCol>Contact</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>
            {suppliers.map((supplier: Supplier) => {
              return (
                <IonRow key={supplier.id}>
                  <IonCol>{supplier.name}</IonCol>
                  <IonCol>{supplier.email}</IonCol>
                  <IonCol>{supplier.phone}</IonCol>
                  <IonCol>{supplier.address}</IonCol>
                  <IonCol>{supplier.web}</IonCol>
                  <IonCol>{supplier.contact}</IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => editSupplier(String(supplier.id))}
                      color='primary'
                      fill='clear'
                      size='small'
                    >
                      <IonIcon icon={pencil} slot='icon-only' />
                    </IonButton>
                    <IonButton
                      onClick={() => remove(String(supplier.id))}
                      color='danger'
                      fill='clear'
                      size='small'
                    >
                      <IonIcon icon={close} slot='icon-only' />
                    </IonButton>
                  </IonCol>
                </IonRow>
              );
            })}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SupplierList;
